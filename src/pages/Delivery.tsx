import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  MapPin, 
  Phone, 
  User, 
  CreditCard, 
  Smartphone, 
  Building2, 
  Banknote,
  ShoppingCart,
  Plus,
  Minus,
  CheckCircle,
  Loader2
} from "lucide-react";

const steps = [
  { id: 1, title: "Address", completed: true, current: false },
  { id: 2, title: "Summary", completed: true, current: false },
  { id: 3, title: "Payment", completed: false, current: true },
  { id: 4, title: "Confirmation", completed: false, current: false }
];

const sampleProducts = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
    price: 2999,
    quantity: 1
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop",
    price: 4999,
    quantity: 1
  }
];

const banks = [
  "State Bank of India",
  "HDFC Bank",
  "ICICI Bank",
  "Axis Bank",
  "Punjab National Bank",
  "Bank of Baroda",
  "Canara Bank"
];

export default function Delivery() {
  const [currentStep, setCurrentStep] = useState(3);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [upiId, setUpiId] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "John Doe",
    phone: "+91 9876543210",
    address: "123 Main Street, Apartment 4B",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001"
  });
  const { toast } = useToast();

  const subtotal = sampleProducts.reduce((sum, product) => sum + (product.price * product.quantity), 0);
  const shipping = 99;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + tax;

  const handlePlaceOrder = async () => {
    if (!paymentMethod) {
      toast({
        title: "Payment Method Required",
        description: "Please select a payment method to continue",
        variant: "destructive"
      });
      return;
    }

    if (paymentMethod === "upi" && !upiId) {
      toast({
        title: "UPI ID Required",
        description: "Please enter your UPI ID",
        variant: "destructive"
      });
      return;
    }

    if (paymentMethod === "netbanking" && !selectedBank) {
      toast({
        title: "Bank Selection Required",
        description: "Please select your bank",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate order processing
    setTimeout(() => {
      setIsProcessing(false);
      setOrderPlaced(true);
      setCurrentStep(4);
      toast({
        title: "Order Placed Successfully! 🎉",
        description: "Your order has been confirmed and will be delivered soon.",
      });
    }, 3000);
  };

  const updateQuantity = (productId: number, change: number) => {
    // In a real app, this would update the cart state
    console.log(`Update product ${productId} quantity by ${change}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-16">
        {/* Progress Steps */}
        <div className="bg-secondary/20 py-6">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center max-w-2xl mx-auto">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-smooth ${
                    step.completed || step.current 
                      ? "bg-primary border-primary text-primary-foreground" 
                      : "border-muted-foreground text-muted-foreground"
                  }`}>
                    {step.completed ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <span className="text-sm font-medium">{step.id}</span>
                    )}
                  </div>
                  <div className="ml-2 mr-4">
                    <p className={`text-sm font-medium ${
                      step.completed || step.current ? "text-primary" : "text-muted-foreground"
                    }`}>
                      {step.title}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-12 h-0.5 mx-4 ${
                      steps[index + 1].completed || steps[index + 1].current 
                        ? "bg-primary" 
                        : "bg-muted-foreground/30"
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            
            {/* Left Column - Address & Payment */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Delivery Address */}
              <Card className="shadow-creative hover-lift transition-smooth">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Delivery Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Full Name
                      </Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        className="transition-smooth focus:scale-105"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="transition-smooth focus:scale-105"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      className="transition-smooth focus:scale-105"
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                        className="transition-smooth focus:scale-105"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) => setFormData({...formData, state: e.target.value})}
                        className="transition-smooth focus:scale-105"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pincode">Pincode</Label>
                      <Input
                        id="pincode"
                        value={formData.pincode}
                        onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                        className="transition-smooth focus:scale-105"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card className="shadow-creative hover-lift transition-smooth">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                    
                    {/* UPI */}
                    <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-secondary/50 transition-smooth">
                      <RadioGroupItem value="upi" id="upi" />
                      <Label htmlFor="upi" className="flex items-center gap-2 cursor-pointer flex-1">
                        <Smartphone className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">UPI Payment</p>
                          <p className="text-sm text-muted-foreground">Pay using UPI ID</p>
                        </div>
                      </Label>
                    </div>
                    
                    {paymentMethod === "upi" && (
                      <div className="ml-6 animate-slide-up">
                        <Input
                          placeholder="Enter your UPI ID (e.g., user@paytm)"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          className="transition-smooth focus:scale-105"
                        />
                      </div>
                    )}

                    {/* Net Banking */}
                    <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-secondary/50 transition-smooth">
                      <RadioGroupItem value="netbanking" id="netbanking" />
                      <Label htmlFor="netbanking" className="flex items-center gap-2 cursor-pointer flex-1">
                        <Building2 className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Net Banking</p>
                          <p className="text-sm text-muted-foreground">Pay using your bank account</p>
                        </div>
                      </Label>
                    </div>
                    
                    {paymentMethod === "netbanking" && (
                      <div className="ml-6 animate-slide-up">
                        <Select value={selectedBank} onValueChange={setSelectedBank}>
                          <SelectTrigger className="transition-smooth focus:scale-105">
                            <SelectValue placeholder="Select your bank" />
                          </SelectTrigger>
                          <SelectContent>
                            {banks.map((bank) => (
                              <SelectItem key={bank} value={bank}>{bank}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {/* Cash on Delivery */}
                    <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-secondary/50 transition-smooth">
                      <RadioGroupItem value="cod" id="cod" />
                      <Label htmlFor="cod" className="flex items-center gap-2 cursor-pointer flex-1">
                        <Banknote className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Cash on Delivery</p>
                          <p className="text-sm text-muted-foreground">Pay when you receive</p>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Order Summary */}
            <div className="space-y-6">
              <Card className="shadow-creative hover-lift transition-smooth sticky top-20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5 text-primary" />
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  
                  {/* Products */}
                  {sampleProducts.map((product) => (
                    <div key={product.id} className="flex items-center gap-4 p-3 border rounded-lg hover:bg-secondary/50 transition-smooth group">
                      <div className="relative overflow-hidden rounded-md">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 object-cover transition-smooth group-hover:scale-110"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{product.name}</h4>
                        <p className="text-primary font-semibold">₹{product.price.toLocaleString()}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 hover-lift"
                          onClick={() => updateQuantity(product.id, -1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center font-medium">{product.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 hover-lift"
                          onClick={() => updateQuantity(product.id, 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}

                  <Separator />

                  {/* Price Breakdown */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      <span>₹{shipping}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax (18%)</span>
                      <span>₹{tax.toLocaleString()}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span className="text-primary">₹{total.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Place Order Button */}
                  {!orderPlaced ? (
                    <Button
                      onClick={handlePlaceOrder}
                      disabled={isProcessing}
                      className="w-full gradient-primary text-primary-foreground hover-lift h-12 text-lg font-semibold"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Processing Order...
                        </>
                      ) : (
                        "Place Order"
                      )}
                    </Button>
                  ) : (
                    <div className="text-center space-y-4 animate-scale-in">
                      <div className="flex items-center justify-center gap-2 text-green-600">
                        <CheckCircle className="h-8 w-8" />
                        <span className="text-xl font-semibold">Order Placed!</span>
                      </div>
                      <p className="text-muted-foreground">
                        Order ID: #ORD{Date.now().toString().slice(-6)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        You will receive a confirmation email shortly.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}