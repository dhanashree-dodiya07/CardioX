import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Heart,
  Activity,
  AlertCircle,
  Shield,
  TrendingUp,
  Users,
} from 'lucide-react';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="text-center mb-16">
        <div className="flex justify-center mb-6">
          {/* <Heart className="h-20 w-20 text-red-500 fill-red-500 animate-pulse" /> */}
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Predict Your Heart Health
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Use advanced machine learning to assess your cardiovascular risk and
          take proactive steps toward a healthier heart.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/predict">
            <Button size="lg" className="text-lg">
              Get Started
            </Button>
          </Link>
          <Link href="/about">
            <Button size="lg" variant="outline" className="text-lg">
              Learn More
            </Button>
          </Link>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Understanding Heart Disease
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="transition-all hover:shadow-lg hover:scale-105">
            <CardHeader>
              <AlertCircle className="h-10 w-10 text-red-500 mb-2" />
              <CardTitle>What is Heart Disease?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Heart disease refers to various conditions affecting the heart,
                including coronary artery disease, arrhythmias, and heart
                failure. It remains the leading cause of death worldwide.
              </p>
            </CardContent>
          </Card>

          <Card className="transition-all hover:shadow-lg hover:scale-105">
            <CardHeader>
              <Activity className="h-10 w-10 text-blue-500 mb-2" />
              <CardTitle>Common Risk Factors</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-muted-foreground space-y-2">
                <li>High blood pressure</li>
                <li>High cholesterol levels</li>
                <li>Smoking and alcohol consumption</li>
                <li>Physical inactivity</li>
                <li>Obesity and poor diet</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="transition-all hover:shadow-lg hover:scale-105">
            <CardHeader>
              <Shield className="h-10 w-10 text-green-500 mb-2" />
              <CardTitle>Prevention is Key</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Early detection and lifestyle changes can significantly reduce
                your risk. Regular exercise, healthy diet, stress management,
                and avoiding tobacco are crucial preventive measures.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Types of Heart Disease
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Coronary Artery Disease (CAD)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                The most common type, caused by plaque buildup in arteries that
                supply blood to the heart. Can lead to chest pain, heart
                attacks, and other complications.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Heart Arrhythmia</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Irregular heartbeat that can be too fast, too slow, or erratic.
                May cause palpitations, dizziness, or fainting.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Heart Failure</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Occurs when the heart cannot pump enough blood to meet the
                body's needs. Symptoms include shortness of breath, fatigue, and
                swelling.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Valvular Heart Disease</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Damage to or defect in one of the heart's valves, affecting
                blood flow through the heart. Can be congenital or acquired.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-16">
        <div className="bg-primary/5 rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Key Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div>
              <TrendingUp className="h-12 w-12 mx-auto mb-4 text-primary" />
              <div className="text-4xl font-bold mb-2">17.9M</div>
              <p className="text-muted-foreground">
                Annual deaths from cardiovascular diseases globally
              </p>
            </div>
            <div>
              <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
              <div className="text-4xl font-bold mb-2">80%</div>
              <p className="text-muted-foreground">
                Of premature heart disease is preventable
              </p>
            </div>
            <div>
              <Heart className="h-12 w-12 mx-auto mb-4 text-red-500" />
              <div className="text-4xl font-bold mb-2">#1</div>
              <p className="text-muted-foreground">
                Leading cause of death worldwide
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Check Your Heart Health?
        </h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Our AI-powered prediction tool can help assess your cardiovascular
          risk based on key health indicators. Take the first step toward a
          healthier heart today.
        </p>
        <Link href="/predict">
          <Button size="lg" className="text-lg">
            Start Prediction
          </Button>
        </Link>
      </section>
    </div>
  );
}
