

import React from 'react'
import { motion } from 'framer-motion'
import { Avatar, Card, CardBody, Divider } from '@nextui-org/react'

type User = {
  _id: string
  name: string
  email: string
  photo: string
}

type Reply = {
  _id: string
  user: string
  comment: string
  createdAt: string
}

type Comment = {
  _id: string
  blog: string
  user: User
  comment: string
  replies: Reply[]
  createdAt: string
  updatedAt: string
}

const comments: Comment[] = [
  {
    "_id": "6735eed1360d375a63d59b4f",
    "blog": "67343319e638c801957dc85a",
    "user": {
      "_id": "6735cd81ce5e9934bedbf8ff",
      "name": "Shakil Ahmmed",
      "email": "shakil@gmail.com",
      "photo": "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png"
    },
    "comment": "helllllllllllllo hellllllllllllllllllllo One more time",
    "replies": [],
    "createdAt": "2024-11-14T12:36:33.981Z",
    "updatedAt": "2024-11-14T12:36:33.981Z"
  },
  {
    "_id": "6735a678b667d15515be1e38",
    "blog": "67343319e638c801957dc85a",
    "user": {
      "_id": "6735800e93e09753966f5bdd",
      "name": "Don't Delete me",
      "email": "dontdelteme@gmail.com",
      "photo": "https://i.ibb.co/pRgF7WH/food3.jpg"
    },
    "comment": "Hello there it is testing comments for investigating any issues there in analytics thank you",
    "replies": [
      {
        "user": "6735cd81ce5e9934bedbf8ff",
        "comment": "hello ",
        "createdAt": "2024-11-14T10:31:50.384Z",
        "_id": "6735d1961d62ce2d95dd171b"
      },
      {
        "user": "6735cd81ce5e9934bedbf8ff",
        "comment": "hi ",
        "createdAt": "2024-11-14T10:31:54.823Z",
        "_id": "6735d19a1d62ce2d95dd173e"
      }
    ],
    "createdAt": "2024-11-14T07:27:52.410Z",
    "updatedAt": "2024-11-14T10:31:54.825Z"
  }
]

const AllCommentOnBlog: React.FC<{ comment: Comment }> = ({ comment }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="mb-4">
        <CardBody>
          <div className="flex items-start space-x-4">
            <Avatar src={comment.user.photo} alt={comment.user.name} className="w-10 h-10" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">{comment.user.name}</h3>
                <span className="text-sm text-gray-500">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="mt-2 text-gray-700">{comment.comment}</p>
              {comment.replies.length > 0 && (
                <div className="mt-4 space-y-4">
                  <Divider />
                  {comment.replies.map((reply) => (
                    <div key={reply._id} className="flex items-start space-x-4 mt-4">
                      <Avatar src={comment.user.photo} alt={comment.user.name} className="w-8 h-8" />
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold">{comment.user.name}</h4>
                          <span className="text-sm text-gray-500">
                            {new Date(reply.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="mt-1 text-gray-700">{reply.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  )
}

export default function BlogComments() {
  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6">Comments</h2>
      {comments.map((comment) => (
        <AllCommentOnBlog key={comment._id} comment={comment} />
      ))}
    </div>
  )
}