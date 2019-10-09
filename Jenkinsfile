pipeline {
  agent {
    docker {
      image 'cypress/browsers:node12.4.0-chrome76'
    }
  }
 
  // tools {nodejs "node"}
 
  stages {
    stage('Audit Dependencies') {
      steps {
        sh 'npm audit'
      }
    }
    stage('Install dependencies') {
      steps {
        sh 'npm ci'
      }
    }
    stage('Lint') {
      steps {
         sh 'npm run lint'
      }
    }
    stage('Test') {
      steps {
        sh 'npm run ci'
      }
    }
  }
}