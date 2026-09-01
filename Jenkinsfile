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
                sh '''
                    docker compose build \
                      --build-arg BUILD_NUMBER=${BUILD_NUMBER} \
                      --build-arg GIT_COMMIT=${GIT_COMMIT}
                    docker compose up -d
                '''
            }
        }
        stage('Build and Start Services') {
            steps {
                echo 'Building and starting Docker containers with Build Args...'
                sh 'docker compose down'
                sh """
                    BUILD_NUMBER=${env.BUILD_NUMBER} \
                    GIT_COMMIT=${env.GIT_COMMIT} \
                    docker compose build \
                      --build-arg BUILD_NUMBER=${env.BUILD_NUMBER} \
                      --build-arg GIT_COMMIT=${env.GIT_COMMIT}
                    
                    BUILD_NUMBER=${env.BUILD_NUMBER} \
                    GIT_COMMIT=${env.GIT_COMMIT} \
                    docker compose up -d
                """
            }
        }
        stage('Run Normal Integration Test') {
            steps {
                echo 'Waiting for services to spin up...'
                sleep 5
                sh 'WEB_URL=http://host.docker.internal:3000 node tests/integration.test.js normal'
            }
        }
        stage('Chaos Test: Kill API Service') {
            steps {
                echo 'CHAOS: Stopping API service...'
                sh 'docker compose stop api-service'
            }
        }
        stage('Run Chaos Validation Test') {
            steps {
                sh 'WEB_URL=http://host.docker.internal:3000 node tests/integration.test.js chaos'
            }
        }
        stage('Recover API Service') {
            steps {
                echo 'RECOVERY: Restarting API service so environment remains fully operational...'
                sh 'docker compose start api-service'
            }
        }

    }
    post {
        success {
            echo 'Pipeline passed successfully! Leaving containers running for you.'
        }
        failure {
            echo 'Pipeline failed. Cleaning up test environment...'
            sh 'docker compose down'
        }
    }
}