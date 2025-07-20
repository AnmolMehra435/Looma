import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const ContactSection = () => {
  return (
    <section id="contact" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold gradient-primary bg-clip-text text-transparent mb-4">
            Contact Us
          </h2>
          <p className="text-lg text-muted-foreground">
            Get in touch with our team. We're here to help bring your design ideas to life.
          </p>
        </div>

        {/* Contact Content */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          
          {/* Contact Form */}
          <Card className="shadow-creative">
            <CardHeader>
              <CardTitle className="text-2xl">Send us a message</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">First Name</label>
                  <Input placeholder="Your first name" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Last Name</label>
                  <Input placeholder="Your last name" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input type="email" placeholder="your.email@example.com" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Subject</label>
                <Input placeholder="What's this about?" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <Textarea 
                  placeholder="Tell us more about your project or question..." 
                  className="min-h-[120px]"
                />
              </div>
              
              <Button className="w-full gradient-primary text-primary-foreground hover-lift">
                Send Message
              </Button>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">Get in touch</h3>
              <p className="text-muted-foreground mb-8">
                Whether you have questions about our platform, need technical support, 
                or want to discuss a custom project, we're here to help.
              </p>
            </div>

            <div className="grid gap-6">
              <Card className="p-6 hover-lift transition-smooth">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Email</h4>
                    <p className="text-muted-foreground">hello@looma.com</p>
                    <p className="text-muted-foreground">support@looma.com</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover-lift transition-smooth">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Phone</h4>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                    <p className="text-muted-foreground">+1 (555) 765-4321</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover-lift transition-smooth">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Office</h4>
                    <p className="text-muted-foreground">
                      123 Design Street<br />
                      Creative District, CD 12345<br />
                      United States
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover-lift transition-smooth">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Business Hours</h4>
                    <p className="text-muted-foreground">
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 10:00 AM - 4:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="text-2xl font-bold mb-4">Frequently Asked Questions</h3>
            <p className="text-muted-foreground">
              Find quick answers to common questions about our platform.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-6">
              <h4 className="font-semibold mb-2">How does the 3D design tool work?</h4>
              <p className="text-muted-foreground text-sm">
                Our 3D design studio allows you to create and visualize custom designs on clothing in real-time. 
                Simply upload your artwork or use our templates to get started.
              </p>
            </Card>
            
            <Card className="p-6">
              <h4 className="font-semibold mb-2">What file formats do you support?</h4>
              <p className="text-muted-foreground text-sm">
                We support common image formats including PNG, JPG, SVG, and PDF. 
                For best results, we recommend using high-resolution images.
              </p>
            </Card>
            
            <Card className="p-6">
              <h4 className="font-semibold mb-2">How long does shipping take?</h4>
              <p className="text-muted-foreground text-sm">
                Standard shipping takes 7-10 business days. Express shipping options are available 
                for faster delivery within 3-5 business days.
              </p>
            </Card>
            
            <Card className="p-6">
              <h4 className="font-semibold mb-2">Can I order samples before bulk orders?</h4>
              <p className="text-muted-foreground text-sm">
                Yes! We offer sample ordering so you can see and feel the quality before 
                placing larger orders. Contact us for sample pricing.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};