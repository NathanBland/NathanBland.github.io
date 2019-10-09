pipeline {
  agent {
    docker {
      image 'cypress/browsers:node12.4.0-chrome76'
    }
  }
 
  // tools {nodejs "node"}
 
  stages {
    stage('Example') {
      steps {
        sh 'npm config ls'
      }
    }
  }
}