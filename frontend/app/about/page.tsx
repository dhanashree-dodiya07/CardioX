import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Brain,
  Target,
  Zap,
  CheckCircle,
  BarChart,
  Shield,
} from 'lucide-react';

export default function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          About Our Prediction Model
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Leveraging advanced machine learning algorithms to provide accurate
          cardiovascular risk assessments and empower preventive healthcare.
        </p>
      </section>

      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground mb-4">
              Our prediction model uses supervised machine learning trained on
              thousands of cardiovascular health records. The model analyzes 10
              key health indicators to predict the likelihood of heart disease.
            </p>
            <p className="text-muted-foreground mb-4">
              The algorithm considers multiple factors including age, gender,
              blood pressure readings, cholesterol levels, glucose levels,
              lifestyle habits (smoking, alcohol, physical activity), and body
              mass index (BMI).
            </p>
            <p className="text-muted-foreground">
              By identifying patterns and correlations in these variables, the
              model can provide a risk assessment that helps individuals and
              healthcare providers make informed decisions.
            </p>
          </div>
          <div className="bg-primary/5 rounded-lg p-8">
            <Brain className="h-24 w-24 mx-auto mb-4 text-primary" />
            <h3 className="text-2xl font-semibold text-center mb-4">
              Machine Learning Algorithm
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">
                  Trained on extensive cardiovascular datasets
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">
                  Validated for accuracy and reliability
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">
                  Continuously improved with new data
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Key Features of Our Model
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="transition-all hover:shadow-lg">
            <CardHeader>
              <Target className="h-10 w-10 text-blue-500 mb-2" />
              <CardTitle>High Accuracy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our model has been rigorously tested and validated, achieving
                high accuracy rates in predicting cardiovascular risk across
                diverse populations.
              </p>
            </CardContent>
          </Card>

          <Card className="transition-all hover:shadow-lg">
            <CardHeader>
              <Zap className="h-10 w-10 text-yellow-500 mb-2" />
              <CardTitle>Instant Results</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Get your risk assessment in seconds. Our optimized algorithm
                processes your health data instantly to provide immediate
                insights.
              </p>
            </CardContent>
          </Card>

          <Card className="transition-all hover:shadow-lg">
            <CardHeader>
              <Shield className="h-10 w-10 text-green-500 mb-2" />
              <CardTitle>Privacy Focused</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Your health data is processed securely and is not stored on our
                servers. We prioritize your privacy and data protection.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Input Parameters Analyzed
        </h2>
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3 flex items-center">
                    <BarChart className="h-5 w-5 mr-2 text-primary" />
                    Demographic Factors
                  </h3>
                  <ul className="space-y-2 text-muted-foreground ml-7">
                    <li>Age (years)</li>
                    <li>Gender (Male/Female)</li>
                    <li>Height (cm) & Weight (kg)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 flex items-center">
                    <BarChart className="h-5 w-5 mr-2 text-primary" />
                    Clinical Measurements
                  </h3>
                  <ul className="space-y-2 text-muted-foreground ml-7">
                    <li>Systolic Blood Pressure (mm Hg)</li>
                    <li>Diastolic Blood Pressure (mm Hg)</li>
                    <li>BMI (calculated automatically)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 flex items-center">
                    <BarChart className="h-5 w-5 mr-2 text-primary" />
                    Laboratory Results
                  </h3>
                  <ul className="space-y-2 text-muted-foreground ml-7">
                    <li>Cholesterol Level (Normal/Border-Line/High)</li>
                    <li>Glucose Level (Normal/Border-Line/High)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 flex items-center">
                    <BarChart className="h-5 w-5 mr-2 text-primary" />
                    Lifestyle Factors
                  </h3>
                  <ul className="space-y-2 text-muted-foreground ml-7">
                    <li>Smoking Status (Yes/No)</li>
                    <li>Alcohol Consumption (Yes/No)</li>
                    <li>Physical Activity (Yes/No)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Technology Used</h2>
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardContent className="pt-6">
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    <span className="font-medium text-foreground">Machine Learning Algorithm:</span> Random Forest Classifier
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    <span className="font-medium text-foreground">Programming Language:</span> Python
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    <span className="font-medium text-foreground">Libraries:</span> Scikit-learn, Pandas, NumPy
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    <span className="font-medium text-foreground">Web Framework:</span> Flask / Next.js
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">
          Why This Matters
        </h2>
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <span className="font-semibold text-foreground">
                    Early Detection Saves Lives:
                  </span>{' '}
                  Identifying cardiovascular risk early allows for timely
                  intervention and lifestyle modifications that can prevent
                  serious heart conditions.
                </p>
                <p>
                  <span className="font-semibold text-foreground">
                    Empowering Individuals:
                  </span>{' '}
                  By providing accessible risk assessments, we enable people to
                  take control of their heart health and make informed decisions
                  about their lifestyle and medical care.
                </p>
                <p>
                  <span className="font-semibold text-foreground">
                    Supporting Healthcare Providers:
                  </span>{' '}
                  Our tool can assist healthcare professionals in screening
                  patients and prioritizing those who need immediate attention or
                  further testing.
                </p>
                <p>
                  <span className="font-semibold text-foreground">
                    Reducing Healthcare Burden:
                  </span>{' '}
                  Preventive healthcare through early risk identification can
                  significantly reduce the economic and social burden of
                  cardiovascular diseases.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-primary/5 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Important Disclaimer</h2>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          This prediction tool is designed for educational and informational
          purposes only. It should not replace professional medical advice,
          diagnosis, or treatment. Always consult with qualified healthcare
          providers regarding any medical conditions or health concerns. The
          predictions are based on statistical models and may not be accurate for
          every individual.
        </p>
      </section>
    </div>
  );
}
