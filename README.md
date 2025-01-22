# RestOS

**REST OS** (Restored Operating System) is a comprehensive platform designed for restaurant management and customer engagement. It includes user-facing features like browsing, ordering, and reviewing food items, as well as an admin panel for managing orders, users, and content. This documentation provides a clear breakdown of all features, routes, and user flows in the system, supporting efficient navigation, development, and future expansion.

<img src="https://i.ibb.co.com/wg2hvL4/Screenshot-48.png" alt="Banner" style="width:100%">
## Table of Contents

| Section | Feature | Description |
|---------|---------|-------------|
| **1. Overview of Features** | General Summary | High-level overview of the key features in the project. |
| | Google Gemini AI | AI integration for auto-generating blog descriptions. |
| | Secure Token Role-Based Authentication | Secure authentication system with role-based access (user/admin). |
| | Robust Search & Filters | Advanced filtering and searching across food, blogs, and user content. |
| | Payment System | Secure payment integration for processing orders. |
| | Profile Management | Ability for users to manage and update their profile with custom preferences. |
| | Notification System | Alerts and notifications for user actions and updates within the system. |
| | Comment System | Users can comment on content (blogs, blocks, etc.), reply, like/dislike comments. |
| **2. User Role Features** | Secure Authentication (Google Sign-In + Manual) | Users can securely sign-in/sign-up using Google or manual forms. |
| | Dashboard Overview | Metrics for spending, order history, and special offers. |
| | Food Ordering System (Search, Filters, Add to Cart) | Users can search, filter, and order food with ease. |
| | Blog System (Create, Comment, Like/Dislike, Save) | Users can create, engage with, and save blogs. |
| | Recipe Section | Users can explore trending and detailed recipes. |
| | Profile Management (Completion Progress, Preferences) | Users can fill out and update their profile, with progress tracking. |
| | Order Tracking and Deletion | View, track, and delete orders before confirmation. |
| | Notification System | View all notifications related to activity, comments, or system alerts. |
| **3. Admin Role Features** | Admin Dashboard (Metrics, Recent Activity Tracking) | Admins can monitor system metrics and user interactions. |
| | User Management (View, Update, Delete Users) | Admins can manage user roles, statuses, and deletions. |
| | Food Management (View, Add, Update, Delete Food, Manage Categories) | Admins can manage food items and categories. |
| | Block Management (View, Approve, Reject, Delete Blocks) | Admins can review, approve, reject, or delete blocks created by users. |
| | Order Management (View, Update Status, Delete Orders) | Admins can manage user orders, update statuses (pending, confirmed, canceled). |
| | Menu Management (View, Filter Menus, Manage Categories) | Admins can manage restaurant menus and filter by categories. |
| | Notification Management | Admins can manage and control the notifications sent to users. |
| | Comment Management | Admins can monitor and manage user comments across the platform. |

## User Capabilities
### Authentication
- Sign up using Google or manual sign-up
- Log in using Google or manual login
- Log out from the application

### Homepage
- View banner section with promotions
- Browse food categories and featured items
- View popular dishes with sliders
- Explore "Why Choose Us" section

### Food Ordering
- Search for food items
- Apply filters (by category, price range, etc.)
- View detailed information about each food item
- Add food items to the cart
- Proceed to checkout for ordering

### Blog System
- Create new blogs (add title, category, tags, image)
- Automatically generate blog description using Google Gemini AI
- Like or dislike blogs for engagement
- Comment on blogs
- Reply to comments on blogs
- Save blogs for later viewing
- View and manage saved blogs

  <img src="https://i.ibb.co.com/qxMTx9c/Screenshot-51.png" alt="dashboard-imag-2" style="width:100%">

### Recipe Section
- View trending recipes
- Read detailed recipes

### Profile Management
- Fill out profile details (personal info, contact, preferences)
- Track profile completion progress with visual indicators
- Update profile preferences (favorite restaurant, payment methods, etc.)

### Order Management
- View order history
- Track order status (pending, confirmed)
- Delete orders before admin confirmation

### Notifications
- View notifications for recent activity (comments, likes, etc.)

### Search
- Use a global search to find food, blogs, recipes, and more
- Filter search results by categories or other criteria

### Dashboard
- View spending metrics
- Track order history and special offers

<img src="https://i.ibb.co.com/DWfBZX8/Screenshot-52.png" alt="dashboard-imag-1" style="width:100%">
<img src="https://i.ibb.co.com/dm4jG94/Screenshot-53.png" alt="dashboard-imag-2" style="width:100%">
<img src="https://i.ibb.co.com/ZStskSs/Screenshot-49.png" alt="dashboard-imag-3" style="width:100%">

## Admin Capabilities

### Authentication
- Log in using admin credentials
- Log out from the admin panel

### Admin Dashboard
- View system metrics (blocks, comments, upvotes, downvotes)
- Monitor recent activities (blocks, comments, upvotes, downvotes)
- Search and filter activity logs

### User Management
- View a list of all users
- Update user roles (admin/user)
- Change user statuses (active/inactive)
- Delete user accounts

### Food Management
- View all food items
- Add new food items (name, description, price, image, category, etc.)
- Edit existing food items
- Delete food items
- Manage food categories (add, edit, delete, filter)

### Block Management
- View all created blocks
- Approve or reject blocks
- Delete blocks

### Order Management
- View all user orders (food items, customer details, price, status)
- Update order statuses (pending, confirmed, canceled)
- Delete orders if needed

### Blog Management
- View all user-created blogs
- Approve or reject blog posts
- Delete blogs

### Notification Management
- View and manage notifications for user activity
- Send notifications to users regarding updates, promotions, or important information

### Menu Management
- View all restaurant menu items
- Manage menu items with filter and search functionality

### Reporting & Analytics
- View and export data for orders, user activities, and other metrics

<img src="https://i.ibb.co.com/RSZsyng/Screenshot-54.png" alt="Banner" style="width:100%">
  

## Front-face Components

### Home
- Banner: Displays promotions and discounts
- Featured Food Slider: Highlights popular or featured food items
- Menus: Lists the available food categories and items
- Why Choose Us: Section detailing why users should choose the restaurant
- Customer Reviews: Section featuring user-submitted reviews

### Food
- Food List Page: Shows all available food items with search and filtering options
- Food Details Page: Provides detailed information about each food item
  - Add to Order: Allows users to add items to their cart. Orders start as **Pending** until confirmed by the admin
 
<img src="https://i.ibb.co.com/9Vc8VdJ/Screenshot-56.png" alt="Banner" style="width:100%">

### Blog
- Blog Details Page: Shows blog content with commenting and interaction options
- View Blocks: Users can view a list of published blocks
- Search and Filter: Users can search for specific blocks or filter blocks by category
- Create Block: Users can submit new blocks
- Edit Own Block: Users can edit blocks they created (if still in "Pending" status)
- View Status: Users can see the status of their submitted blocks
- Comment on Blogs: Users can comment on blocks and respond to others' comments
- Like Blogs: Users can like blocks to show appreciation or interest
- Save Blog: Users can save a blog post to view later
- Mark as Favorite: Users can mark specific blog posts as favorites for quick access

<img src="https://i.ibb.co.com/9Vc8VdJ/Screenshot-56.png" alt="Banner" style="width:100%">

### Recipe
- View Recipes: Users can view a list of available recipes
- View Recipe Details: Users can see details like ingredients, preparation steps, and additional notes
- Favorite Recipes: Users can mark recipes as favorites for quick access

<img src="https://i.ibb.co.com/9Vc8VdJ/Screenshot-56.png" alt="Banner" style="width:100%">

### FAQ
- FAQ Page: Contains commonly asked questions and answers
  
<img src="https://i.ibb.co.com/9Vc8VdJ/Screenshot-56.png" alt="Banner" style="width:100%">
### Authentication
- User Avatar and Dropdown Menu: Once logged in, the Sign-Up button is replaced with the user's avatar

## Dashboard Components

### User Dashboard
- Welcome Message: Personalized greeting for the user
- Order Statistics: Graphical representation of the user's completed orders
- Suggested Foods: Recommendations based on user history or popular items
- Profile Page: Displays user information, loyalty points, favorite recipes, and orders
- Order History: Shows completed and pending orders
- Loyalty Points: Tracks user points based on their activity
- Pending Orders: Displays all orders awaiting admin confirmation
- Favorite Recipes Page: Lists all recipes marked as favorites by the user
- Purchased Orders: Displays all confirmed orders in a separate list
- Settings Page: Allows users to manage personal account settings

<img src="https://i.ibb.co.com/9Vc8VdJ/Screenshot-56.png" alt="Banner" style="width:100%">

### Admin Dashboard
- User Overview: Total number of users, new sign-ups, and user engagement metrics
- Order Overview: Total orders, confirmed orders, and pending orders
- Order List: Shows all orders with the ability to confirm or cancel them
- Blog Post Approval: Admins review and approve user-submitted blog posts
- Recipe and Comment Moderation: Admins manage recipe comments and mark recipes as verified
- Notifications: Notify users about order confirmations and approved content

<img src="https://i.ibb.co.com/9Vc8VdJ/Screenshot-56.png" alt="Banner" style="width:100%">

## UI Inspiration
- [Salero Redesign - Food Delivery Dashboard Design](https://dribbble.com/shots/19773207-Salero-Redesign-Food-Delivery-Dashboard-Design)
- [Restaurant Dashboard](https://dribbble.com/shots/18317197-Restaurant-Dashboard/attachments/13526534?mode=media)
- [Healthy buddha bowl lunch image](https://www.istockphoto.com/photo/healthy-buddha-bowl-lunch-with-grilled-chicken-quinoa-spinach-avocado-brussels-gm920931456-252987219)
- [Cloud Application Platform | Render](https://render.com/)
- [Eating a variety of foods Customizable Disproportionate Illustrations](https://storyset.com/illustration/eating-a-variety-of-foods/cuate)
