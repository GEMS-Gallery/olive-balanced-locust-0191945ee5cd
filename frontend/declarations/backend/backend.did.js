export const idlFactory = ({ IDL }) => {
  const CategoryId = IDL.Nat;
  const Result_3 = IDL.Variant({ 'ok' : CategoryId, 'err' : IDL.Text });
  const TopicId = IDL.Nat;
  const PostId = IDL.Nat;
  const Result_2 = IDL.Variant({ 'ok' : PostId, 'err' : IDL.Text });
  const ReplyId = IDL.Nat;
  const Result_1 = IDL.Variant({ 'ok' : ReplyId, 'err' : IDL.Text });
  const Result = IDL.Variant({ 'ok' : TopicId, 'err' : IDL.Text });
  const Category = IDL.Record({ 'id' : CategoryId, 'name' : IDL.Text });
  const Time = IDL.Int;
  const Post = IDL.Record({
    'id' : PostId,
    'content' : IDL.Text,
    'createdAt' : Time,
    'replies' : IDL.Vec(ReplyId),
    'topicId' : TopicId,
  });
  const Reply = IDL.Record({
    'id' : ReplyId,
    'content' : IDL.Text,
    'createdAt' : Time,
    'postId' : PostId,
  });
  const Topic = IDL.Record({
    'id' : TopicId,
    'categoryId' : CategoryId,
    'title' : IDL.Text,
    'createdAt' : Time,
  });
  return IDL.Service({
    'createCategory' : IDL.Func([IDL.Text], [Result_3], []),
    'createPost' : IDL.Func([TopicId, IDL.Text], [Result_2], []),
    'createReply' : IDL.Func([PostId, IDL.Text], [Result_1], []),
    'createTopic' : IDL.Func([CategoryId, IDL.Text], [Result], []),
    'getCategories' : IDL.Func([], [IDL.Vec(Category)], ['query']),
    'getPosts' : IDL.Func([TopicId], [IDL.Vec(Post)], ['query']),
    'getReplies' : IDL.Func([PostId], [IDL.Vec(Reply)], ['query']),
    'getTopics' : IDL.Func([], [IDL.Vec(Topic)], ['query']),
    'getTopicsByCategory' : IDL.Func([CategoryId], [IDL.Vec(Topic)], ['query']),
    'initCategories' : IDL.Func([], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
