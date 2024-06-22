# Codelabs

![blackbg](https://github.com/muthuri-dev/codelabs-client/assets/82339780/732128c1-5f89-4d6c-9d22-8f3b8e2fd690)

[![GitHub Stars](https://img.shields.io/github/stars/muthuri-dev/equine-tracker)](https://github.com/muthuri-dev/equine-tracker/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/muthuri-dev/equine-tracker)](https://github.com/muthuri-dev/equine-tracker/network/members)
[![GitHub Issues](https://img.shields.io/github/issues/muthuri-dev/equine-tracker)](https://github.com/muthuri-dev/equine-tracker/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/muthuri-dev/equine-tracker)](https://github.com/muthuri-dev/equine-tracker/pulls)

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Installation](#installation)
4. [DataFlow](#DataFlow)
5. [Contributing](#contributing)
6. [License](#license)
7. [Acknowledgments](#acknowledgments)

## Introduction

This project is a web application for tech enthusiasts, offering course uploads from instructors, a community space for interaction, and a dedicated discussion forum to learn, connect, and share knowledge in the ever-evolving tech landscape.

![yourhub-mockup](https://github.com/muthuri-dev/codelabs-client/assets/82339780/bcf0581e-3a7c-47fa-881f-967f275f0579)
![dashboard](https://github.com/muthuri-dev/codelabs-client/assets/82339780/4aec5a6e-edc2-4aac-a8b2-ec2cc6b8da7c)

## Features

Codelabs comes with a wide range of features tailored for horse care:

- **Learning platform**: Get to learn from community experts.
- **Course uploads**: Upload course in your are of expertise in form of writing.
- **Tech discussions**: Get engauged in tech related discussions and also start one.
- **Chat features**: Communication made easy for community members to reach everyone.
- **Integrate other apps**: Intergrate other apps to the site.
- **Community**: Connect with fellow tech enthusiasts and share your expertise.

## Installation

To start using Equine Tracker, follow these installation steps:

1. Fork and Clone the repository:

   ```bash
   fork the repo

   git clone https://github.com/muthuri-dev/codelabs-client
   ```

2. Navigate to the project directory:

   ```bash
   cd codelabs-client
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

4. Start the application:

   ```bash
   npm run start:dev
   ```

   5.Create .env file and add:

```bash
  DATABASE_URL
  KINDE_CLIENT_ID
  KINDE_CLIENT_SECRET
  KINDE_ISSUER_URL
  KINDE_SITE_URL
  KINDE_POST_LOGOUT_REDIRECT_URL
  KINDE_POST_LOGIN_REDIRECT_URL

  UPLOADTHING_SECRET
  UPLOADTHING_APP_ID
```

## DataFlow

The application uses different microservices(subgraphs) connected together with graphql federation 2 gateway which connects with frontend.Each microservice uses different database

![codelabs.png](/.eraser/VU6n1CKCIe3oVBiKNXES___hJuLF9q4mgcDgmFW7ntHRbaoiOh1___RXlqlt40_JJYK9QmCZb33.png "codelabs.png")

## Contributing

We welcome contributions from the community! If you have ideas for improvements, bug reports, or want to contribute code, please check our [Contribution Guidelines](CONTRIBUTING.md) for details on how to get involved.

## License

Equine Tracker is open-source software licensed under the Apache License 2.0. For full details, refer to the [LICENSE](LICENSE) file.

## Acknowledgments

We'd like to extend our gratitude to the equestrian community for their support and inspiration.

Thank you for choosing codelabs!

<!--- Eraser file: https://app.eraser.io/workspace/VU6n1CKCIe3oVBiKNXES --->
