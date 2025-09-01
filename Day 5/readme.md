**getElementById()-->Find element by unique ID**
**querySelector()-->Find first matching element**
**querySelectorAll()-->Find all matching elements**
**getElementsByClassName()-->Find elements by class**

**Method 1: getElementById (fastest for single elements)**
const heading = document.getElementById('main-heading');

**// Method 2: querySelector (modern, CSS selectors)**
const button = document.querySelector('.btn-primary');
const firstLink = document.querySelector('a');

**// Method 3: querySelectorAll (returns NodeList)**
const allButtons = document.querySelectorAll('button');
const redItems = document.querySelectorAll('.text-red');

**// Method 4: getElementsByClassName (returns HTMLCollection)**
const cards = document.getElementsByClassName('card');