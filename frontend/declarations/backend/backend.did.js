export const idlFactory = ({ IDL }) => {
  const TopicId = IDL.Nat;
  const PostId = IDL.Nat;
  const Result_2 = IDL.Variant({ 'ok' : PostId, 'err' : IDL.Text });
  const ReplyId = IDL.Nat;
  const Result_1 = IDL.Variant({ 'ok' : ReplyId, 'err' : IDL.Text });
  const Result = IDL.Variant({ 'ok' : TopicId, 'err' : IDL.Text });
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
    'title' : IDL.Text,
    'createdAt' : Time,
  });
  return IDL.Service({
    'createPost' : IDL.Func([TopicId, IDL.Text], [Result_2], []),
    'createReply' : IDL.Func([PostId, IDL.Text], [Result_1], []),
    'createTopic' : IDL.Func([IDL.Text], [Result], []),
    'getPosts' : IDL.Func([TopicId], [IDL.Vec(Post)], ['query']),
    'getReplies' : IDL.Func([PostId], [IDL.Vec(Reply)], ['query']),
    'getTopics' : IDL.Func([], [IDL.Vec(Topic)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
