

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Avatar, Button, Card, Divider } from "@nextui-org/react"
import { ThumbsUp, ThumbsDown, Share2, MessageCircle, Facebook, Twitter, Instagram } from "lucide-react"
import BlogComments from "./AllCommentOnBlog"
import CommentLayout from "../layout/CommentLayout"
import { useParams } from "react-router-dom"

export default function Component() {
  const [upvotes, setUpvotes] = useState(0)
  const [downvotes, setDownvotes] = useState(3)
  const {id} = useParams()

  
  

  return (
    <div className="min-h-screen bg-gray-50/50">
      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-full max-w-4xl mx-auto bg-white shadow-xl">
            <div className="p-6 md:p-8">
              {/* Author Section */}
              <div className="flex items-center gap-4 mb-8">
                <Avatar
                  src="https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png"
                  size="lg"
                />
                <div>
                  <h3 className="text-xl font-semibold">Chef Mario</h3>
                  <p className="text-gray-500">Web Development</p>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-4xl font-bold mb-6">Not found image</h1>

              {/* Main Image */}
              <div className="relative aspect-video mb-8 rounded-lg overflow-hidden">
                <img
                  src="https://res.cloudinary.com/dmg3ltri6/image/upload/v1731585694/Chef%20Mario_Not%20found%20image.png"
                  alt="404 Error Page Design"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Description */}
              <div className="prose max-w-none mb-8">
                <p className="text-lg text-gray-700 leading-relaxed">
                  This image is a creative illustration of a 404 error page. It depicts a rocket shooting through space, 
                  with the number "404" in the background. The rocket is in a green color, and the background is in a 
                  black color. There are also stars and planets in the background. This design is a fun and playful way 
                  to communicate a 404 error to visitors of your site. It lets the user know that they've landed on a page 
                  that doesn't exist, but it also creates a positive and engaging experience.
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="px-3 py-1 bg-[#00D019]/10 text-[#00D019] rounded-full text-sm">
                  Web Development
                </span>
                <span className="px-3 py-1 bg-[#00D019]/10 text-[#00D019] rounded-full text-sm">
                  404 Page
                </span>
                <span className="px-3 py-1 bg-[#00D019]/10 text-[#00D019] rounded-full text-sm">
                  UI Design
                </span>
              </div>

              <Divider className="my-8" />

              {/* Interaction Section */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <Button
                    variant="light"
                    startContent={<ThumbsUp className="w-5 h-5" />}
                    onClick={() => setUpvotes(prev => prev + 1)}
                  >
                    {upvotes}
                  </Button>
                  <Button
                    variant="light"
                    startContent={<ThumbsDown className="w-5 h-5" />}
                    onClick={() => setDownvotes(prev => prev + 1)}
                  >
                    {downvotes}
                  </Button>
                  <Button
                    variant="light"
                    startContent={<MessageCircle className="w-5 h-5" />}
                  >
                    Comments
                  </Button>
                </div>
                <div className="flex items-center gap-4">
                  <Button isIconOnly variant="light" aria-label="Share on Facebook">
                    <Facebook className="w-5 h-5 text-[#00D019]" />
                  </Button>
                  <Button isIconOnly variant="light" aria-label="Share on Twitter">
                    <Twitter className="w-5 h-5 text-[#00D019]" />
                  </Button>
                  <Button isIconOnly variant="light" aria-label="Share on Instagram">
                    <Instagram className="w-5 h-5 text-[#00D019]" />
                  </Button>
                  <Button
                    className="bg-[#00D019] text-[white]"
                    startContent={<Share2 className="w-5 h-5" />}
                  >
                    Share
                  </Button>
                </div>
              </div>

              {/* Instructions */}
              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#00D019] text-[white] flex items-center justify-center">
                      1
                    </div>
                    <p className="text-gray-700">Step 1</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-[25px]">Comments</h2>
              <CommentLayout blogId={`${id}`}/>
              </div>
            </div>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}