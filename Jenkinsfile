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
    stage('Install Dependencies') {
      steps {
        sh 'npm ci'
      }
    }
    stage('Lint Code') {
      steps {
        sh 'npm run lint'
      }
    }
    stage('Build Project') {
      steps {
        sh 'npm run build'
      }
    }
    stage('Tests') {
      steps {
        sh 'npm run ci'
      }
    }
  }
}