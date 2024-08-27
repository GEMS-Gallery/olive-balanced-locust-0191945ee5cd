import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Post {
  'id' : PostId,
  'content' : string,
  'createdAt' : Time,
  'replies' : Array<ReplyId>,
  'topicId' : TopicId,
}
export type PostId = bigint;
export interface Reply {
  'id' : ReplyId,
  'content' : string,
  'createdAt' : Time,
  'postId' : PostId,
}
export type ReplyId = bigint;
export type Result = { 'ok' : TopicId } |
  { 'err' : string };
export type Result_1 = { 'ok' : ReplyId } |
  { 'err' : string };
export type Result_2 = { 'ok' : PostId } |
  { 'err' : string };
export type Time = bigint;
export interface Topic { 'id' : TopicId, 'title' : string, 'createdAt' : Time }
export type TopicId = bigint;
export interface _SERVICE {
  'createPost' : ActorMethod<[TopicId, string], Result_2>,
  'createReply' : ActorMethod<[PostId, string], Result_1>,
  'createTopic' : ActorMethod<[string], Result>,
  'getPosts' : ActorMethod<[TopicId], Array<Post>>,
  'getReplies' : ActorMethod<[PostId], Array<Reply>>,
  'getTopics' : ActorMethod<[], Array<Topic>>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
