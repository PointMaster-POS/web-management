# PointMaster POS Web Management Frontend

This is one of the front-end applications for the PointMaster POS system. This web management front-end allows administrators, including business owner, branch managers, and inventory managers to manage various aspects of the business, including menu management, staff accounts, inventory tracking, and reporting. The system integrates seamlessly with the PointMaster POS backend API for real-time data processing.

## Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Usage](#usage)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Menu Management**: Create, edit, and delete menu items, and categories.
- **Inventory Management**: Track stock levels, and update inventory in real-time.
- **User & Staff Management**: Manage user roles and staff scheduling.
- **Sales Monitoring**: Generate daily, weekly, and monthly sales reports.
- **Reports & Analytics**: Access key performance indicators and detailed sales analytics.
- **Multi-Location Support**: Manage multiple restaurant locations from a single interface.
- **POS Integration**: Real-time synchronization with the PointMastern POS system.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js
- npm or yarn
- Git
- A modern web browser

## Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/PointMaster-POS/web-management.git
    cd pointmaster
    ```
2. **Install dependencies:**
    ```bash
    npm install
    ```
    or, if you are using yarn:
    ```bash
    yarn install
    ```
    
## Running the Application

To start the development server, use:
 ```bash
 npm start
 ```
or
 ```bash
 yarn start
 ```
This will start the application on http://localhost:3000.

## Usage

Once the application is running, you can log in using your admin credentials. Here’s a quick overview of the main sections:
1. **Dashboard:** View overall business performance across all branches using key business metrics.
2. **Category:** Allow access to create, update, and delete categories. View category details.
3. **Products:** Allow access to create, update, and delete categories for selected categories. View product details.
4. **Employees:** Allow access to add, update, and delete employees. View employee details.
5. **Stores:** Allow access to create, update, and delete stores. View store details.
6. **Expires:** View more details of products that expire within a month from the current date.
7. **Loyalty:** Allow access to create, and update loyalty programs. View loyalty program details.
8. **Profile:** Allow access to view and edit both business and owner details.

## Testing

To run unit tests, use:
 ```bash
 npm test
 ```
or
 ```bash
 yarn test
 ```
## Contributing

We welcome contributions! Please follow these steps to contribute:

  1. Fork the repository.
  2. Create a feature branch: git checkout -b my-new-feature.
  3. Commit your changes: git commit -am 'Add some feature'.
  4. Push to the branch: git push origin my-new-feature.
  5. Open a pull request.
     
Make sure to update tests as appropriate.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
