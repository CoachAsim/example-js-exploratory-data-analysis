# 🌤️ London Weather Data Analysis

Welcome to the London Weather Data Analysis project! Before diving into the code, let's understand some important concepts that will help you work with the data.

## 📚 Important Concept: Data Structure Flexibility

> **Note:** There are several ways to create the same functionality when building software. For example, loading data from CSV files can be done using different approaches. This project uses the `csv-parser` package, which loads data as an array of objects. Other packages might structure the data differently!

## 🔑 Key Concepts

### 1. 📋 Arrays: Understanding Lists in JavaScript

Think of an array as an ordered list of items. In our weather data, we're working with a list of 14 days of weather information.

**Key Points:**
* Items are stored in order
* Each item has a position number (index) starting from 0
* To access items, we use square brackets `[]`

**Example:**
```javascript
// To get the 3rd day's data:
weatherData[2]  // We use 2 because counting starts at 0!
```

### 2. 📦 Objects: Organizing Related Data

An object is like a labeled container that holds related information. In our weather data, each day is an object containing various weather measurements.

**Weather Properties:**
| Property | Description |
|----------|-------------|
| `date` | Date of the weather reading |
| `cloud_cover` | How cloudy it was |
| `sunshine` | Amount of sunshine |
| `global_radiation` | Radiation level |
| `max_temp` | Highest temperature that day |
| `mean_temp` | Average temperature |
| `min_temp` | Lowest temperature |
| `precipitation` | Rainfall amount |
| `pressure` | Atmospheric pressure |
| `snow_depth` | Depth of snow |

### 3. 🗂️ Arrays of Objects: Putting It All Together

Our weather data combines both concepts: it's an array (list) of objects (daily weather measurements).

**Example of One Day's Data:**
```javascript
{
    date: "20240101",
    cloud_cover: "6.5",
    sunshine: "2.3",
    global_radiation: "123.45",
    max_temp: "12.3",
    mean_temp: "10.1",
    min_temp: "8.4",
    precipitation: "0.2",
    pressure: "1013.2",
    snow_depth: "0"
}
```

**Accessing Specific Data:**
```javascript
// To get the radiation level for the first day:
weatherData[0].global_radiation

// Breaking this down:
// 1. weatherData[0]         -> gets the first day's object
// 2. .global_radiation     -> gets the radiation value from that object
```

## 🚀 Getting Started

To run this project:
1. Make sure you have Node.js installed
2. Install the required packages using `npm install`
3. Run the program using `node index.js`

## 💡 Need Help?

If you're stuck or have questions:
- Review the comments in the code
- Try console.logging the data to see its structure
- Remember that array indices start at 0!

Happy coding! 🎉