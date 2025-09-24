# Vitals Tracker

A comprehensive health vitals tracking web application built with React.js, Tailwind CSS, and Redux. Track your health metrics, view historical data with charts, and receive smart alerts based on your vitals.

## Features

`Click on Heath Records on sidebar to navigate to "See your vitals"`

### 🏥 Vitals Input Screen
- **Manual Entry**: Enter all essential health vitals including:
  - Height & Weight (with automatic BMI calculation)
  - Respiration Rate
  - Temperature
  - Blood Pressure (Systolic & Diastolic)
  - Pulse Oxygen Level
  - Blood Glucose
  - Heart Rate
- **Floating Action Button**: Easy access to add new vitals
- **Form Validation**: Comprehensive validation with real-time error feedback
- **Auto-calculation**: BMI automatically calculated from height and weight

### 📊 Vitals History & Chart Screen
- **Interactive Charts**: Beautiful line charts using Recharts library
- **7-Day Trends**: View your vitals over the last 7 days
- **Multiple Metrics**: Track Blood Pressure, Heart Rate, Oxygen Level, Temperature, and Weight
- **Date Filtering**: Select specific dates to view historical data
- **Data Table**: Detailed table view of all recent entries
- **Average Calculations**: 7-day averages for all metrics

### 🚨 Smart Alert System
- **Automatic Detection**: Real-time anomaly detection based on medical thresholds
- **Alert Types**:
  - ⚠️ High Heart Rate (>120 BPM)
  - 🫁 Low Oxygen Level (<95%)
  - ⚠️ High Blood Pressure (SYS >140 or DIA >90)
  - 🌡️ High Temperature (>100.4°F)
  - 🩸 High Blood Glucose (>140 mg/dL)
- **Recommendations**: Actionable health recommendations for each alert
- **Alert Management**: Clear alerts and contact doctor functionality

### 🎨 Modern UI/UX
- **Responsive Design**: Works perfectly on all screen sizes
- **Clean Interface**: Modern, clean design matching Figma specifications
- **Intuitive Navigation**: Easy-to-use tabbed interface
- **Real-time Updates**: Instant feedback and updates
- **Accessibility**: Proper contrast and keyboard navigation

## Tech Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Charts**: Recharts
- **Icons**: Lucide React
- **Date Handling**: date-fns

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. **Clone or download the project**
   ```bash
   cd vitals-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

### Adding Vitals
1. Click the floating "+" button in the bottom-right corner
2. Fill in all required vitals fields
3. Watch BMI calculate automatically
4. Click "Save Vitals" to store the data

### Viewing History
1. Navigate to the "History & Charts" tab
2. View interactive charts for the last 7 days
3. Use the date picker to filter specific dates
4. Review the detailed data table

### Managing Alerts
1. Alerts appear automatically when thresholds are exceeded
2. Click the "Alerts" button in the header to view all alerts
3. Review recommendations and take appropriate action
4. Clear alerts when addressed

## Data Storage

The application uses Redux for state management and stores all data locally in the browser. No backend server is required - all vitals are stored in the browser's memory and persist during the session.

## Health Thresholds

The smart alert system uses medically recognized thresholds:

- **Heart Rate**: Normal 60-100 BPM, Alert >120 BPM
- **Blood Pressure**: Normal <140/90 mmHg, Alert >140/90 mmHg
- **Oxygen Saturation**: Normal 95-100%, Alert <95%
- **Temperature**: Normal 97-100.4°F, Alert >100.4°F
- **Blood Glucose**: Normal 70-140 mg/dL, Alert >140 mg/dL

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

For support or questions, please open an issue in the repository.

---

**Note**: This application is for educational and personal use. Always consult with healthcare professionals for medical advice and proper health monitoring.
