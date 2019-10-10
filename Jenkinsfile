pipeline {
  agent {
    docker {
      image 'cypress/browsers:node12.4.0-chrome76'
    }
  }
  stages {
    stage('Run NPM audit') {
      steps {
        sh 'npm audit'
      }
    }
  }
}