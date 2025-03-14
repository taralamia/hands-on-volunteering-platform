# hands-on-volunteering-platform
HandsOn is a community-driven social volunteering platform that connects individuals with  meaningful social impact opportunities.Users can discover and join volunteer-driven events, 
post requests for community help, form teams for large-scale initiatives, and track their impact with contributions logged on a personal and team level.
# Project Overview
The project enables users to sign up, log in securely, and manage their profiles. Each user profile contains basic information, skills, and causes they support (e.g., environmental, education, healthcare). Users can update their profile and view their volunteer history and contributions.
# Technologies Used
- Backend: Node.js, Express
- Database: MongoDB(NoSQL)
- Authentication: JSON Web Tokens (JWT) for secure user authentication
- Frontend: React.js
- Styling: CSS for layout and styling
- Environment Configuration: .env file for sensitive configurations (e.g., JWT secret, MongoDB URI)
# Features 
- User Registration: Users can sign up with their email and password.
- User Login: Secure login system using JWT for token-based authentication
- Profile Management: View and edit user profile
- Dashboard: After login, users are redirected to a dashboard to manage their profile and explore social causes.
- JWT Authentication: Secure authentication to ensure data privacy and prevent unauthorized access.
- Error Handling: Clear error messages and validation for missing or invalid data.
  # Setup Intructions
  ## Backend Setup
1. **Clone the repository**:
   ```bash
   git clone https://github.com/taralamia/hands-on-volunteering-platform.git
2. **Install dependencies**:
   ```bash
      npm install
3. **Create a .env file**:
   JWT_SECRET=your_jwt_secret_key
   MONGO_URI=your_mongodb_connection_uri
4. **Run the backend server**:
     ```bash
      npm start
  ## Frontend setup
1. **Clone the repository**:
    ```bash
   git clone https://github.com/taralamia/hands-on-volunteering-platform.git
2. **Navigate to frontend directory**:
   ```bash
    cd frontend
3. **Install frontend dependencies**:
   ```bash
   cd frontend
4. **Run the front end server**:
   ```bash
   npm start
   
