import Iter "mo:base/Iter";

import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Result "mo:base/Result";
import Buffer "mo:base/Buffer";
import Hash "mo:base/Hash";

actor {
  // Types
  type CategoryId = Nat;
  type TopicId = Nat;
  type PostId = Nat;
  type ReplyId = Nat;

  type Category = {
    id: CategoryId;
    name: Text;
  };

  type Topic = {
    id: TopicId;
    categoryId: CategoryId;
    title: Text;
    createdAt: Time.Time;
  };

  type Post = {
    id: PostId;
    topicId: TopicId;
    content: Text;
    createdAt: Time.Time;
    replies: [ReplyId];
  };

  type Reply = {
    id: ReplyId;
    postId: PostId;
    content: Text;
    createdAt: Time.Time;
  };

  // Stable variables
  stable var nextCategoryId: Nat = 0;
  stable var nextTopicId: Nat = 0;
  stable var nextPostId: Nat = 0;
  stable var nextReplyId: Nat = 0;

  // Mutable state
  let categories = HashMap.HashMap<CategoryId, Category>(10, Nat.equal, Hash.hash);
  let topics = HashMap.HashMap<TopicId, Topic>(10, Nat.equal, Hash.hash);
  let posts = HashMap.HashMap<PostId, Post>(50, Nat.equal, Hash.hash);
  let replies = HashMap.HashMap<ReplyId, Reply>(100, Nat.equal, Hash.hash);

  // Helper functions
  func generateId(nextId: Nat) : Nat {
    nextId
  };

  // Create a new category
  public func createCategory(name: Text) : async Result.Result<CategoryId, Text> {
    let id = generateId(nextCategoryId);
    nextCategoryId += 1;
    let category: Category = {
      id = id;
      name = name;
    };
    categories.put(id, category);
    #ok(id)
  };

  // Get all categories
  public query func getCategories() : async [Category] {
    Buffer.toArray(Buffer.fromIter<Category>(categories.vals()))
  };

  // Create a new topic
  public func createTopic(categoryId: CategoryId, title: Text) : async Result.Result<TopicId, Text> {
    switch (categories.get(categoryId)) {
      case null { #err("Category not found") };
      case (?_) {
        let id = generateId(nextTopicId);
        nextTopicId += 1;
        let topic: Topic = {
          id = id;
          categoryId = categoryId;
          title = title;
          createdAt = Time.now();
        };
        topics.put(id, topic);
        #ok(id)
      };
    }
  };

  // Get all topics
  public query func getTopics() : async [Topic] {
    Buffer.toArray(Buffer.fromIter<Topic>(topics.vals()))
  };

  // Get topics for a specific category
  public query func getTopicsByCategory(categoryId: CategoryId) : async [Topic] {
    let categoryTopics = Buffer.Buffer<Topic>(0);
    for (topic in topics.vals()) {
      if (topic.categoryId == categoryId) {
        categoryTopics.add(topic);
      };
    };
    Buffer.toArray(categoryTopics)
  };

  // Create a new post
  public func createPost(topicId: TopicId, content: Text) : async Result.Result<PostId, Text> {
    switch (topics.get(topicId)) {
      case null { #err("Topic not found") };
      case (?_) {
        let id = generateId(nextPostId);
        nextPostId += 1;
        let post: Post = {
          id = id;
          topicId = topicId;
          content = content;
          createdAt = Time.now();
          replies = [];
        };
        posts.put(id, post);
        #ok(id)
      };
    }
  };

  // Get posts for a specific topic
  public query func getPosts(topicId: TopicId) : async [Post] {
    let topicPosts = Buffer.Buffer<Post>(0);
    for (post in posts.vals()) {
      if (post.topicId == topicId) {
        topicPosts.add(post);
      };
    };
    Buffer.toArray(topicPosts)
  };

  // Create a reply to a post
  public func createReply(postId: PostId, content: Text) : async Result.Result<ReplyId, Text> {
    switch (posts.get(postId)) {
      case null { #err("Post not found") };
      case (?post) {
        let id = generateId(nextReplyId);
        nextReplyId += 1;
        let reply: Reply = {
          id = id;
          postId = postId;
          content = content;
          createdAt = Time.now();
        };
        replies.put(id, reply);
        let updatedPost = {
          post with replies = Array.append(post.replies, [id]);
        };
        posts.put(postId, updatedPost);
        #ok(id)
      };
    }
  };

  // Get replies for a specific post
  public query func getReplies(postId: PostId) : async [Reply] {
    switch (posts.get(postId)) {
      case null { [] };
      case (?post) {
        let postReplies = Buffer.Buffer<Reply>(0);
        for (replyId in post.replies.vals()) {
          switch (replies.get(replyId)) {
            case null {};
            case (?reply) { postReplies.add(reply); };
          };
        };
        Buffer.toArray(postReplies)
      };
    }
  };

  // Initialize categories
  public func initCategories() : async () {
    let categoryNames = ["General", "Technology", "Science", "Arts", "Sports", "Entertainment"];
    for (name in categoryNames.vals()) {
      ignore await createCategory(name);
    };
  };
}
