pipeline {
    agent any

    environment {
        DOCKERHUB_USERNAME = "2023bcs0085adhikp"
        REGISTER_NUMBER    = "2023BCS0085"
        ROLL_NUMBER        = "BCS85"

        FRONTEND_IMAGE     = "${DOCKERHUB_USERNAME}/${REGISTER_NUMBER}_${ROLL_NUMBER}_frontend"
        BACKEND_IMAGE      = "${DOCKERHUB_USERNAME}/${REGISTER_NUMBER}_${ROLL_NUMBER}_backend"
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Cloning repository...'
                checkout scm
            }
        }

        stage('Build Docker Images') {
            steps {
                echo 'Building frontend image...'
                sh "docker build -t ${FRONTEND_IMAGE} ./frontend"

                echo 'Building backend image...'
                sh "docker build -t ${BACKEND_IMAGE} ./backend"
            }
        }

        stage('Push to Docker Hub') {
            steps {
                echo 'Logging into Docker Hub...'
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-credentials',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin"

                    echo 'Pushing frontend image...'
                    sh "docker push ${FRONTEND_IMAGE}"

                    echo 'Pushing backend image...'
                    sh "docker push ${BACKEND_IMAGE}"
                }
            }
        }

        stage('Cleanup') {
            steps {
                echo 'Removing local images to free space...'
                sh "docker rmi ${FRONTEND_IMAGE} || true"
                sh "docker rmi ${BACKEND_IMAGE} || true"
            }
        }
    }

    post {
        success {
            echo "Pipeline succeeded! Images pushed to Docker Hub."
        }
        failure {
            echo "Pipeline failed. Check logs above."
        }
    }
}