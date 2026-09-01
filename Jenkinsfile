pipeline {
    agent any
    environment {
        BUILD_STAMP = "${env.BUILD_NUMBER}-${env.GIT_COMMIT ?: 'local'}"
    }
    stages {
        stage('Checkout from Git') {
            steps {
                // משיכת הקוד מ-GitHub (Jenkins עושה זאת אוטומטית אם מוגדר ב-Job)
                checkout scm
            }
        }
        stage('Inject Build Stamp') {
            steps {
                echo "Injecting Build Stamp: ${env.BUILD_STAMP}"
                sh "echo BUILD_VERSION=${env.BUILD_STAMP} > .env"
            }
        }
        stage('Test Docker CLI & Compose') {
            steps {
                sh 'docker --version'
                sh 'docker compose version'
            }
        }
        stage('Build and Deploy Services') {
            steps {
                echo 'Building Docker images...'
                sh 'docker compose build'
                sh 'docker compose up -d'
            }
        }
    }
}