# Startforge Assignment

## Directory Structure

- `/client`: React frontend built with Vite
- `/server`: Django REST Framework backend

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

## Usage

1. Access the frontend at `http://localhost:5173`
2. Access the Django admin interface at `http://localhost:8000/admin`
3. API endpoints are available at `http://localhost:8000/api/movies`
