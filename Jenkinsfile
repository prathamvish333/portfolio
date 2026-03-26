pipeline {
    agent any
    
    environment {
        DOCKER_HUB_USER = 'prathamvish'
        IMAGE_NAME = "${DOCKER_HUB_USER}/portfolio"
        // Use the branch name (dev, sit, prod) as the Docker tag
        TAG = "${env.BRANCH_NAME ?: 'dev'}"
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo "🚀 Starting Portfolio Build for Branch: ${TAG}"
                checkout scm
            }
        }
        
        stage('Build & Push Image') {
            steps {
                script {
                    // This uses the 'docker-hub-creds' we created in Jenkins
                    docker.withRegistry('', 'docker-hub-creds') {
                        
                        echo "Building Portfolio: ${IMAGE_NAME}:${TAG}"
                        sh "docker build -t ${IMAGE_NAME}:${TAG} ."
                        sh "docker push ${IMAGE_NAME}:${TAG}"
                    }
                }
            }
        }
        
        stage('GitOps Sync (ArgoCD)') {
            steps {
                echo "Syncing Portfolio manifests for environment: ${TAG}"
                // Logic to update K8s manifests will go here
                echo "Successfully triggered ArgoCD for ${TAG}!"
            }
        }
    }
    
    post {
        success {
            echo "✅ Successfully deployed Portfolio ${TAG} version!"
        }
        failure {
            echo "❌ Portfolio Pipeline failed for ${TAG}!"
        }
    }
}
