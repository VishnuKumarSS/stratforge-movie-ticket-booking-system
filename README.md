# Startforge Assignment

## Directory Structure

- `/client`: React frontend built with Vite
- `/server`: Django REST Framework backend that includes postman collection file

## Backend Setup

1. Navigate to the server directory:
   ```
   cd server
   ```

2. Create a virtual environment:
   ```
   uv venv --python python3.10
   source venv/bin/activate
   ```

3. Install dependencies:
   ```
   uv pip sync server/requirements.txt
   ```

4. Run migrations:
   ```
   python manage.py makemigrations
   python manage.py migrate
   ```

5. Initialize application data:
   ```
   python manage.py create_dependency_data
   ```

6. Start the server:
   ```
   python manage.py runserver
   ```

## Frontend Setup

1. Navigate to the client directory:
   ```
   cd client
   ```

2. Create a `.env` file with the following content:
   ```
   VITE_BACKEND_BASE_URL=http://localhost:8000
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm run dev
   ```

## Env setup
```bash
ENVIRONMENT=DEV
SECRET_KEY=samplesecretkey

# Database Configuration credentials supabase
POSTGRES_DATABASE_NAME=db_name
POSTGRES_USER=db_username
POSTGRES_PASSWORD=db_password
POSTGRES_HOST=localhost
POSTGRES_PORT=5432

# Base url of frontend and backend
FRONTEND_BASE_URL=
BACKEND_URL=

# Supabase secret keys
SUPABASE_PROJECT_URL=
SUPABASE_API_KEY=
```

## Areas to be improved
1. Would have used TypeScript
2. State management using libraries like zustand
3. More intuitive design
4. Containerization with Docker
5. Documentation for API endpoints
6. Caching strategies
7. User authentication
