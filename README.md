# ClockIn
A simple and functional personal time-tracking web app.

## Backend
### Technologies used
- Django
- Django REST Framework
- SQLite

### Features
- User authentication
- Check-in submission and deletion
- Pagination to support large data

## Frontend
### Technologies used
- NextJS
- TypeScript
- ChartJS
- Material UI
- Axios

### Features
- Sign up, Login, and Logout functionality
- Dashboard page with data visualization charts
- Checkins page with checkin functionality and responsive table display
- Highly responsive and mobile friendly UI

## Installation

### Clone this repository
```
git clone https://github.com/carl-mate/clockin.git
```
### Backend setup
#### In the backend directory, create a virtual environment to isolate the package dependencies locally
```
python3 -m venv venv
source venv/bin/activate
```
Sidenote: I used Python 3.10.12
#### Install dependencies
- Go to ```backend/clockin```
- Run
```
pip install -r requirements.txt
```
#### Apply database migrations
```
python manage.py migrate
```

#### Run the development server
```
python manage.py runserver
```

#### API Endpoints
- /api/auth/registration/: Register a new user.
- /api/auth/login/: Log in with a user.
- /api/auth/logout/: Log out the user.
- /api/auth/user/: Get authenticated user details.
- /api/checkins/: Create, Read, and Delete operations for user check-ins.
- /api/checkins/dashboard_data/: Aggregated data for dashboard display

### Frontend setup
#### Install dependencies
- Go to ```frontend/clockin```
- Run
```
npm install
```
#### Run the development server
```
npm run dev
```

## Testing
I created a utility script that will generate 1000 (or more) dummy check-in data for a user with the help of the ```django-seed``` library.
### Steps to generate 1000 check-in data
- Important Precondition: At least one user should be registered
- Find a file called ```seeding.py```
- Manually update the hardcoded ```user_id``` to match the user_id (or primary key) of the user you want to generate dummy data for
- <img width="541" alt="image" src="https://github.com/carl-mate/clockin/assets/57213180/9e57ed2d-5b60-49dc-90d3-f99d09631df1">
- To get the ```user_id```, login to Django REST Framework's Browsable API ```http://localhost:8000/api/auth/login/```
- Once logged in, go to ```http://localhost:8000/api/auth/user/``` and you will find your ```user_id``` here
- <img width="1280" alt="image" src="https://github.com/carl-mate/clockin/assets/57213180/8c791333-0bdf-4c51-98bd-ac3a294102a7">
- In the ```backend/clockin``` directory, run
```
python manage.py seeding
```
- Login using the user credentials you generated dummy data for.
- Dashboard page should look something like this: ![image](https://github.com/carl-mate/clockin/assets/57213180/3ddb80ed-b61b-4ab3-8115-27738286b92f)

## Screenshots
### Login page
![image](https://github.com/carl-mate/clockin/assets/57213180/03104636-92d3-442e-a663-af92cf7905d0)

### Signup page
![image](https://github.com/carl-mate/clockin/assets/57213180/eb74334c-b07d-4dca-9f05-da7c1a82fa05)

### Dashboard page
![image](https://github.com/carl-mate/clockin/assets/57213180/ac355768-f5bb-4253-aee8-381b9f939b5b)

### Checkins page
![image](https://github.com/carl-mate/clockin/assets/57213180/90edee82-2dce-457c-b234-287f6cccfe79)

## Author
Carl Joseph P. Mate

