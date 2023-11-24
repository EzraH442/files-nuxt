pipeline {
  agent any

  environment {
    AWS_SECRET_ACCESS_KEY  = credentials('files-gateway-b2AppKey')
    AWS_ACCESS_KEY_ID      = credentials('files-gateway-b2AppKeyId')
    authUrl                = credentials('files-authUrl')
  }

  stages {
    stage('build main') {
      steps {
        sh 'docker build -t ezraweb/files-nuxt:latest --build-arg authUrl="${authUrl}" --build-arg AWS_SECRET_ACCESS_KEY="${AWS_SECRET_ACCESS_KEY}" --build-arg AWS_ACCESS_KEY_ID="${AWS_ACCESS_KEY_ID}" .'
      }
    }
  }
}