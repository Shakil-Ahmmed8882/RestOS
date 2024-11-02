import { BsBell } from "react-icons/bs";
import PopoverWrapper from "../../../../../shared/ui/wrapper/PopoverWrapper";
import React from "react";
import notification from "../../../../../assets/img/dashboard/notification1.png"
const Notification = () => {
  return (
    <section>
      <PopoverWrapper triggerElement={<BsBell className="size-5" />}>
        <div className="!w-96">
          <NotificationComponent/>
        </div>
      </PopoverWrapper>
    </section>
  );
};

export default Notification;





import { Card, CardHeader, CardBody, Avatar } from "@nextui-org/react"
import { MdFastfood } from "react-icons/md"

function NotificationComponent() {
  const notifications = {
    today: [
      {
        id: 1,
        user: {
          name: "Elayamani",
          avatar: "https://pxraja.com/wp-content/uploads/2024/06/girls-dp-for-facebook_40.webp",
        },
        action: "Liked your DailyUI",
        target: "05k - Favourites",
        time: "2 h ago",
        hasPreview: true
      },
      {
        id: 2,
        user: {
          name: "Admin",
          avatar: "https://www.profilebakery.com/wp-content/uploads/2024/05/Profile-picture-created-with-ai.jpeg",
        },
        action: "Confirmed your",
        target: "order",
        time: "1 h ago",
        hasPreview: false
      },
      {
        id: 3,
        user: {
          name: "Arslan Ali",
          avatar: "https://scontent.fdac177-1.fna.fbcdn.net/v/t39.30808-6/461191792_2690814857759108_6370836121608527167_n.jpg?stp=dst-jpg_p526x296&_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeE9fswGEsxy7_BUQzZGmATCIGdoC1qc3wogZ2gLWpzfCtaNu3VY5JDXB-iBZBrgRJJZ8YsUdRwT0EqWJcrEjFLh&_nc_ohc=SveiG3XgHLgQ7kNvgGAOuOx&_nc_zt=23&_nc_ht=scontent.fdac177-1.fna&_nc_gid=AlzX9-qgU2C5xtGnUNa8cqI&oh=00_AYAwAZAa9JPEzUkWL4Y-_x4Rc1xFrgFhYN9wRlRE3NT4Iw&oe=672C07BE",
        },
        action: "Liked your DailyUI",
        target: "044 - Food menu",
        time: "6 h ago",
        hasPreview: true
      },
      {
        id: 4,
        user: {
          name: "Admin",
          avatar: "https://onesky.com.bd/frontendAssets/img/admin-login.png",
        },
        action: "Promoted your",
        target: "new product",
        time: "30 min ago",
        hasPreview: false
      }
    ],
    thisWeek: [
      {
        id: 5,
        user: {
          name: "Brice Seraphim",
          avatar: "https://sarahclaysocial.com/wp-content/uploads/2020/10/sarah-clay-3.jpg",
        },
        action: "Liked your DailyUI",
        target: "UI 044 - Food menu",
        time: "5 June",
        hasPreview: true
      },
      {
        id: 6,
        user: {
          name: "Johny wine",
          avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3rmMN7hj0VcRblisq5l4tUwbYP10y1yuL6Q&s",
        },
        action: "Mentioned you in",
        target: "a comment",
        time: "8 h ago",
        hasPreview: true
      },
      {
        id: 7,
        user: {
          name: "Best UI Design",
          avatar: "https://cdn6.f-cdn.com/files/download/38546484/28140e.jpg",
        },
        action: "Started following",
        target: "your work",
        time: "5 June",
        hasPreview: false
      },
      {
        id: 8,
        user: {
          name: "You",
          avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-z5uWBugUNkIKGAJIGlP3A4opXyG_gpgwIQ&s",
        },
        action: "Placed a new",
        target: "order",
        time: "4 June",
        hasPreview: true
      },
      {
        id: 9,
        user: {
          name: "Admin",
          avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6Hb5xzFZJCTW4cMqmPwsgfw-gILUV7QevvQ&s",
        },
        action: "Announced a",
        target: "promotion",
        time: "3 June",
        hasPreview: false
      }
    ]
  };
  return (
    <Card className="pt-5 ">
      <CardHeader className="flex justify-between items-center py-4">
        <div className="flex justify-between w-full gap-2 pb-2">
          <div>
          <h2 className="text-2xl pb-1 font-semibold">Notifications</h2>
          <p className="text-lg text-[#a9a9a9]">You have 3  notifications.</p>
          </div>
          <img src={notification} className="size-20" alt="" />
        </div>
       
      </CardHeader>
      <CardBody className="px-2 py-0">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium px-4 mb-2">Today</h3>
            {notifications.today.map((notification) => (
              <div
                key={notification.id}
                className="flex items-center gap-3 px-4 py-4 hover:bg-default-100 cursor-pointer transition-colors"
              >
                <Avatar
                  src={notification.user.avatar}
                  className="flex-shrink-0"
                  size="sm"
                />
                <div className="flex-grow min-w-0 space-y-2">
                  <p className="text-sm">
                    <span className=" block pb-[3px]">{notification.user.name}</span>
                    {' '}{notification.action}{' '}
                    <span className="text-[gray]">{notification.target}</span>
                  </p>
                  <p className="text-xs text-default-400">{notification.time}</p>
                </div>
                {notification.hasPreview && (
                  <div className="flex-shrink-0 w-10 h-10 bg-[#f0fff2] rounded-lg flex items-center justify-center">
                    <MdFastfood className="w-5  text-primaryColor h-5 " />
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div>
            <h3 className="text-sm font-medium px-4 mb-2">This Week</h3>
            {notifications.thisWeek.map((notification) => (
              <div
                key={notification.id}
                className="flex items-center gap-3 px-4 py-3 hover:bg-default-100 cursor-pointer transition-colors"
              >
                <Avatar
                  src={notification.user.avatar}
                  className="flex-shrink-0"
                  size="sm"
                />
                <div className="flex-grow min-w-0">
                  <p className="text-sm">
                    <span className="font-medium">{notification.user.name}</span>
                    {' '}{notification.action}{' '}
                    <span className="text-default-500">{notification.target}</span>
                  </p>
                  <p className="text-xs text-default-400">{notification.time}</p>
                </div>
                {notification.hasPreview && (
                  <div className="flex-shrink-0 w-10 h-10 bg-default-100 rounded-lg flex items-center justify-center">
                    <MdFastfood className="w-5 h-5 text-default-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardBody>
    </Card>
  )
}