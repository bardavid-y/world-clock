pipeline {
    agent any
    environment {
        BUILD_STAMP = "${env.BUILD_NUMBER}-${env.GIT_COMMIT ?: 'local'}"
    }
    stages {
        stage('Checkout from Git') {
            steps {
                checkout scm
            }
        }
        stage('Inject Build Stamp') {
            steps {
                echo "Injecting Build Stamp: ${env.BUILD_STAMP}"
                sh "echo BUILD_VERSION=${env.BUILD_STAMP} > .env"
            }
        }
        stage('Build and Start Services') {
            steps {
                echo 'Building and starting Docker containers...'
                sh 'docker compose down'
                sh 'docker compose up --build -d'
            }
        }
        stage('Run Integration Test') {
            steps {
                echo 'Waiting for services to spin up...'
                sleep 5
                echo 'Running integration test between Web and API...'
                sh 'node tests/integration.test.js'
            }
        }
    }
    post {
        always {
            echo 'Cleaning up test environment containers...'
            sh 'docker compose down'
        }
    }
}