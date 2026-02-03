'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Activity,
  AlertCircle,
  Download,
  Loader2,
  CheckCircle,
} from 'lucide-react';
import jsPDF from 'jspdf';

interface FormData {
  age: string;
  gender: string;
  height: string;
  weight: string;
  ap_hi: string;
  ap_lo: string;
  cholesterol: string;
  gluc: string;
  smoke: string;
  alco: string;
  active: string;
}

interface PredictionResult {
  heart_risk: number;
  risk_probability: number;
  bmi: number;
}

export default function Predict() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  const [formData, setFormData] = useState<FormData>({
    age: '',
    gender: '',
    height: '',
    weight: '',
    ap_hi: '',
    ap_lo: '',
    cholesterol: '',
    gluc: '',
    smoke: '',
    alco: '',
    active: '',
  });

  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  const validateForm = (): boolean => {
    const requiredFields = Object.entries(formData);
    for (const [key, value] of requiredFields) {
      if (!value || value === '') {
        setError(`Please fill in all fields. Missing: ${key}`);
        return false;
      }
    }

    if (
      parseFloat(formData.age) < 1 ||
      parseFloat(formData.age) > 120
    ) {
      setError('Age must be between 1 and 120');
      return false;
    }

    if (
      parseFloat(formData.height) < 50 ||
      parseFloat(formData.height) > 250
    ) {
      setError('Height must be between 50 and 250 cm');
      return false;
    }

    if (
      parseFloat(formData.weight) < 20 ||
      parseFloat(formData.weight) > 300
    ) {
      setError('Weight must be between 20 and 300 kg');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          age: parseFloat(formData.age),
          gender: formData.gender,
          height: parseFloat(formData.height),
          weight: parseFloat(formData.weight),
          ap_hi: parseFloat(formData.ap_hi),
          ap_lo: parseFloat(formData.ap_lo),
          cholesterol: formData.cholesterol,
          gluc: formData.gluc,
          smoke: formData.smoke,
          alco: formData.alco,
          active: formData.active,
        }),
      });

      if (!response.ok) {
        let message = 'Failed to get prediction. Please try again.';
        try {
          const errJson = await response.json();
          if (errJson?.error) message = errJson.error;
        } catch {}
        throw new Error(message);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Network error. Ensure the API is reachable.'
      );
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    if (!result) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    doc.setFontSize(20);
    doc.text('Heart Disease Prediction Report', pageWidth / 2, 20, {
      align: 'center',
    });

    doc.setFontSize(12);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 40);
    doc.text(`Time: ${new Date().toLocaleTimeString()}`, 20, 48);

    doc.setFontSize(14);
    doc.text('Patient Information', 20, 65);
    doc.setFontSize(11);
    doc.text(`Age: ${formData.age} years`, 20, 75);
    doc.text(`Gender: ${formData.gender}`, 20, 82);
    doc.text(`Height: ${formData.height} cm`, 20, 89);
    doc.text(`Weight: ${formData.weight} kg`, 20, 96);
    doc.text(`BMI: ${result.bmi}`, 20, 103);

    doc.setFontSize(14);
    doc.text('Clinical Measurements', 20, 120);
    doc.setFontSize(11);
    doc.text(`Systolic BP: ${formData.ap_hi} mm Hg`, 20, 130);
    doc.text(`Diastolic BP: ${formData.ap_lo} mm Hg`, 20, 137);
    doc.text(`Cholesterol: ${formData.cholesterol}`, 20, 144);
    doc.text(`Glucose: ${formData.gluc}`, 20, 151);

    doc.setFontSize(14);
    doc.text('Lifestyle Factors', 20, 168);
    doc.setFontSize(11);
    doc.text(`Smoking: ${formData.smoke}`, 20, 178);
    doc.text(`Alcohol: ${formData.alco}`, 20, 185);
    doc.text(`Physical Activity: ${formData.active}`, 20, 192);

    doc.setFontSize(16);
    doc.setTextColor(result.heart_risk === 1 ? 220 : 34,
                     result.heart_risk === 1 ? 38 : 197,
                     result.heart_risk === 1 ? 38 : 94);
    doc.text('Prediction Result', 20, 215);
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(
      `Risk Status: ${result.heart_risk === 1 ? 'HIGH RISK' : 'LOW RISK'}`,
      20,
      225
    );
    doc.text(
      `Risk Probability: ${(result.risk_probability * 100).toFixed(1)}%`,
      20,
      232
    );

    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(
      'Disclaimer: This prediction is for informational purposes only.',
      20,
      255
    );
    doc.text(
      'Please consult a healthcare professional for medical advice.',
      20,
      262
    );

    doc.save('heart-disease-prediction.pdf');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Heart Disease Prediction</h1>
          <p className="text-muted-foreground">
            Fill in your health information to get an assessment of your
            cardiovascular risk
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-6 w-6 mr-2 text-primary" />
              Health Information Form
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="age">Age (years)</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="e.g., 45"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) => handleInputChange('gender', value)}
                  >
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="e.g., 170"
                    value={formData.height}
                    onChange={(e) => handleInputChange('height', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="e.g., 75"
                    value={formData.weight}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ap_hi">Systolic Blood Pressure (mm Hg)</Label>
                  <Input
                    id="ap_hi"
                    type="number"
                    placeholder="e.g., 120"
                    value={formData.ap_hi}
                    onChange={(e) => handleInputChange('ap_hi', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ap_lo">
                    Diastolic Blood Pressure (mm Hg)
                  </Label>
                  <Input
                    id="ap_lo"
                    type="number"
                    placeholder="e.g., 80"
                    value={formData.ap_lo}
                    onChange={(e) => handleInputChange('ap_lo', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cholesterol">Cholesterol Level</Label>
                  <Select
                    value={formData.cholesterol}
                    onValueChange={(value) =>
                      handleInputChange('cholesterol', value)
                    }
                  >
                    <SelectTrigger id="cholesterol">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Normal">Normal</SelectItem>
                      <SelectItem value="Border-Line">Border-Line</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gluc">Glucose Level</Label>
                  <Select
                    value={formData.gluc}
                    onValueChange={(value) => handleInputChange('gluc', value)}
                  >
                    <SelectTrigger id="gluc">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Normal">Normal</SelectItem>
                      <SelectItem value="Border-Line">Border-Line</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="smoke">Do you smoke?</Label>
                  <Select
                    value={formData.smoke}
                    onValueChange={(value) => handleInputChange('smoke', value)}
                  >
                    <SelectTrigger id="smoke">
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="alco">Do you consume alcohol?</Label>
                  <Select
                    value={formData.alco}
                    onValueChange={(value) => handleInputChange('alco', value)}
                  >
                    <SelectTrigger id="alco">
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="active">Are you physically active?</Label>
                  <Select
                    value={formData.active}
                    onValueChange={(value) => handleInputChange('active', value)}
                  >
                    <SelectTrigger id="active">
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  'Get Prediction'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {result && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                {result.heart_risk === 1 ? (
                  <AlertCircle className="h-6 w-6 mr-2 text-red-500" />
                ) : (
                  <CheckCircle className="h-6 w-6 mr-2 text-green-500" />
                )}
                Prediction Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div
                  className={`p-6 rounded-lg ${
                    result.heart_risk === 1
                      ? 'bg-red-500/10 border border-red-500/20'
                      : 'bg-green-500/10 border border-green-500/20'
                  }`}
                >
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">
                      Risk Status
                    </p>
                    <p
                      className={`text-3xl font-bold ${
                        result.heart_risk === 1
                          ? 'text-red-500'
                          : 'text-green-500'
                      }`}
                    >
                      {result.heart_risk === 1 ? 'HIGH RISK' : 'LOW RISK'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">
                      Risk Probability
                    </p>
                    <p className="text-2xl font-bold">
                      {(result.risk_probability * 100).toFixed(1)}%
                    </p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">
                      Your BMI
                    </p>
                    <p className="text-2xl font-bold">{result.bmi}</p>
                  </div>
                </div>

                {result.heart_risk === 1 && (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Based on the analysis, you may have an elevated risk of
                      heart disease. Please consult with a healthcare
                      professional for a comprehensive evaluation and
                      personalized advice.
                    </AlertDescription>
                  </Alert>
                )}

                <Button
                  onClick={downloadPDF}
                  className="w-full"
                  variant="outline"
                  size="lg"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download Report as PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
