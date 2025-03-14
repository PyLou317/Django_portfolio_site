# Django Portfolio Site

This is my personal portfolio website built using the Django web framework. It showcases my projects, skills, and experience.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Development Server](#running-the-development-server)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **Project Showcase:** Displays a collection of my projects with descriptions and links.
- **Skill Overview:** Highlights my technical skills and areas of expertise.
- **About Me:** Provides information about my background and experience.
- **Contact Form:** Allows visitors to easily contact me.
- **Responsive Design:** Ensures the site looks good on various devices.
- **User Authentication:** Allows users to create accounts and log in.
- **Blog:** Includes a blog section for articles and updates.
- **Finance Tracker App:** A comprehensive dashboard to display user uploaded bank transactions with auto categorization.
- **Admin Panel:** Provides an admin interface for content management.

## Technologies Used

- **Django:** Web framework for building the application.
- **Python:** Programming language.
- **HTML, CSS, JavaScript:** Front-end technologies.
- **Bootstrap:** CSS framework for responsive design.
- **PostgreSQL/SQLite:** Database.
- **Crispy Forms:** For improved form rendering.
- **django-allauth:** For user authentication.
- **TinyMCE/CKEditor:** For rich text editing.
- **django-taggit:** For tagging posts.

## Getting Started

### Prerequisites

- Python (version 3.10 or higher)
- pip (Python package manager)
- Virtual environment (recommended)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone [repository URL]
    cd [repository name]
    ```

2.  **Create a virtual environment (recommended):**

    ```bash
    python -m venv .venv
    source .venv/bin/activate  # On macOS/Linux
    .venv\Scripts\activate  # On Windows
    ```

3.  **Install dependencies:**

    ```bash
    pip install -r requirements.txt
    ```

4.  **Apply migrations:**

    ```bash
    python manage.py migrate
    ```

5.  **Create a superuser (for admin access):**

    ```bash
    python manage.py createsuperuser
    ```

### Running the Development Server

```bash
python manage.py runserver
```

Open your browser and navigate to http://127.0.0.1:8000/.

### Project Structure
```
portfolio/
├── portfolio/          # Main project directory
│   ├── __init__.py
│   ├── asgi.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── apps/               # Application directories
│   ├── home/           # Example app (e.g., home page)
│   │   ├── __init__.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── migrations/
│   │   ├── models.py
│   │   ├── tests.py
│   │   ├── urls.py
│   │   └── views.py
│   ├── blog/           # Example app (e.g., blog)
│   │   └── ...
│   └── ...
├── static/             # Static files (CSS, JavaScript, images)
├── templates/          # HTML templates
├── manage.py           # Django management script
├── requirements.txt    # Project dependencies
└── .venv/              # Virtual environment
```

### Deployment

Needs updating


### Contact

Email: lucas.patriquin@gmail.conm
LinkedIn: https://www.linkedin.com/in/lucas-patriquin/

