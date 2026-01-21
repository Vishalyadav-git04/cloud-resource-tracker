# Secure-CRUD: Cloud Resource Tracker

A Multi-Container DevOps project demonstrating a production-ready workflow with Nginx, Node.js, and MongoDB.

## 🏗 System Architecture
This project follows a strict **Microservices Architecture** running inside a private Docker network:


1.  **Proxy (Nginx):** The "Gatekeeper." It listens on port 80 and forwards traffic to the backend. It is the only service exposed to the host.
2.  **App (Node.js):** The "Brain."A secure Express API that runs as a non-root user for security.
3.  **Database (MongoDB):** The "Storage." Persists data using Docker Volumes.

## 🚀 Getting Started

### Prerequisites
* Docker & Docker Compose installed on your machine.

### Installation & Deployment
We use a unified automation script to manage the lifecycle.

1.  **Clone the repository:**
    ```bash
    git clone <GITHUB_REPO_LINK>
    cd cloud-resource-tracker
    ```

2.  **Run the automated deploy script:**
    ```bash
    chmod +x deploy.sh
    ./deploy.sh
    ```
    *This script will check Docker status, clean old containers, build new images, and perform a health check.*

3.  **Verify the application:**
    * Visit `http://localhost/health` to see the API status.
    * Use Postman or curl to test endpoints at `http://localhost/api/resources`.

## 🛠 API Endpoints
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/resources` | List all tracked resources |
| `POST` | `/api/resources` | Add a new resource |
| `PUT` | `/api/resources/:id` | Update a resource |
| `DELETE` | `/api/resources/:id` | Remove a resource |

## ⚙️ DevOps Concepts Implemented
* **Containerization:** Optimized Alpine-based Dockerfile with non-root user security.
* **Orchestration:** `docker-compose` handling service dependency and networking.
* **Reverse Proxying:** Nginx routing traffic to the internal Node.js container.
* **CI/CD:** GitHub Actions pipeline triggers on push, builds the image, and pushes to Docker Hub.

## 🛡 Security & Vulnerability Audit

Security scanning was performed using **Docker Scout** to ensure production readiness.

### 🔹 Measures Taken
* **Base Image:** Upgraded to `node:22-alpine` (Active LTS) to ensure long-term security support and minimize EOL vulnerabilities.
* **Least Privilege:** Application runs as a non-root user (`USER node`) to prevent privilege escalation attacks.
* **Network Isolation:** Database and App containers communicate strictly within a private Docker network; only Nginx is exposed to the host.
* **Automated Patching:** The `Dockerfile` includes `RUN apk update && apk upgrade` to force the installation of the latest OS-level security patches during every build.

### 🔹 Known Issues (Vulnerability Exception)
* **Scan Result:** 3 High Severity CVEs detected.
* **Status:** **Unpatched Upstream**.
* **Explanation:** These vulnerabilities exist within the base Alpine Linux packages and currently have no available patches from the maintainers. They are monitored and will be automatically resolved in future builds once the Alpine team releases the fixes.