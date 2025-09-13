import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Filter, 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  X,
  Download,
  RotateCcw,
  Star,
  MapPin,
  Calendar,
  Eye
} from "lucide-react";

const orderStatuses = ["All", "In Progress", "Delivered", "Cancelled"];

const trackingSteps = [
  { id: 1, title: "Order Placed", icon: CheckCircle, completed: true },
  { id: 2, title: "Packed", icon: Package, completed: true },
  { id: 3, title: "Shipped", icon: Truck, completed: true },
  { id: 4, title: "Out for Delivery", icon: Truck, completed: false },
  { id: 5, title: "Delivered", icon: CheckCircle, completed: false }
];

const sampleOrders = [
  {
    id: "ORD123456",
    productName: "Premium Cotton T-Shirt",
    productImage: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop",
    orderDate: "2024-01-15",
    deliveryAddress: "123 Main Street, Mumbai, Maharashtra 400001",
    totalPrice: 1299,
    status: "In Progress",
    estimatedDelivery: "2024-01-18",
    courier: "BlueDart Express",
    trackingNumber: "BD123456789",
    currentStep: 3
  },
  {
    id: "ORD123457",
    productName: "Designer Denim Jacket",
    productImage: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=200&h=200&fit=crop",
    orderDate: "2024-01-10",
    deliveryAddress: "456 Park Avenue, Delhi, Delhi 110001",
    totalPrice: 3499,
    status: "Delivered",
    deliveredDate: "2024-01-13",
    courier: "FedEx",
    trackingNumber: "FX987654321",
    currentStep: 5
  },
  {
    id: "ORD123458",
    productName: "Casual Summer Dress",
    productImage: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200&h=200&fit=crop",
    orderDate: "2024-01-12",
    deliveryAddress: "789 Fashion Street, Bangalore, Karnataka 560001",
    totalPrice: 2299,
    status: "Cancelled",
    cancelledDate: "2024-01-13",
    currentStep: 1
  },
  {
    id: "ORD123459",
    productName: "Classic Leather Boots",
    productImage: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200&h=200&fit=crop",
    orderDate: "2024-01-08",
    deliveryAddress: "321 Style Street, Pune, Maharashtra 411001",
    totalPrice: 4999,
    status: "Delivered",
    deliveredDate: "2024-01-11",
    courier: "Amazon Logistics",
    trackingNumber: "AM456789123",
    currentStep: 5
  }
];

export default function TrackOrders() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const filteredOrders = sampleOrders.filter(order => {
    const matchesSearch = searchQuery === "" || 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.productName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "All" || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "Cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "In Progress":
        return <Clock className="h-4 w-4" />;
      case "Delivered":
        return <CheckCircle className="h-4 w-4" />;
      case "Cancelled":
        return <X className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-16">
        {/* Header */}
        <div className="bg-secondary/20 py-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                Track Your
                <span className="gradient-primary bg-clip-text text-transparent mx-3">
                  Orders
                </span>
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                Monitor your order status and delivery progress in real-time
              </p>
            </div>

            {/* Search and Filter Bar */}
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Search by Order ID or Product Name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 rounded-full border-2 focus:border-primary transition-smooth"
                  />
                </div>
                
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-48 h-12 rounded-full">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {orderStatuses.map((status) => (
                        <SelectItem key={status} value={status}>{status}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <p className="text-sm text-muted-foreground">
                Showing {filteredOrders.length} orders
              </p>
            </div>

            <div className="space-y-6">
              {filteredOrders.map((order, index) => (
                <Card 
                  key={order.id} 
                  className="shadow-creative hover-lift transition-smooth animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    {/* Order Header */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
                      <div className="relative group">
                        <img
                          src={order.productImage}
                          alt={order.productName}
                          className="w-20 h-20 object-cover rounded-lg transition-smooth group-hover:scale-110"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                          <h3 className="font-semibold text-lg truncate">{order.productName}</h3>
                          <Badge className={`${getStatusColor(order.status)} border w-fit`}>
                            {getStatusIcon(order.status)}
                            <span className="ml-1">{order.status}</span>
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Package className="h-4 w-4" />
                            Order ID: {order.id}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Ordered: {new Date(order.orderDate).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span className="truncate">{order.deliveryAddress}</span>
                          </div>
                          <div className="font-semibold text-primary">
                            ₹{order.totalPrice.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleOrderDetails(order.id)}
                        className="hover-lift"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        {expandedOrder === order.id ? "Hide Details" : "View Details"}
                      </Button>
                      
                      {order.status === "In Progress" && (
                        <Button variant="outline" size="sm" className="hover-lift">
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                      )}
                      
                      <Button variant="outline" size="sm" className="hover-lift">
                        <Download className="h-4 w-4 mr-2" />
                        Invoice
                      </Button>
                      
                      {order.status === "Delivered" && (
                        <>
                          <Button variant="outline" size="sm" className="hover-lift">
                            <RotateCcw className="h-4 w-4 mr-2" />
                            Reorder
                          </Button>
                          <Button variant="outline" size="sm" className="hover-lift">
                            <Star className="h-4 w-4 mr-2" />
                            Rate
                          </Button>
                        </>
                      )}
                    </div>

                    {/* Expanded Details */}
                    {expandedOrder === order.id && (
                      <div className="animate-slide-up">
                        <Separator className="mb-4" />
                        
                        {/* Tracking Progress */}
                        {order.status === "In Progress" && (
                          <div className="mb-6">
                            <h4 className="font-semibold mb-4">Order Tracking</h4>
                            <div className="flex items-center justify-between max-w-2xl">
                              {trackingSteps.map((step, index) => (
                                <div key={step.id} className="flex flex-col items-center">
                                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-smooth ${
                                    index < order.currentStep
                                      ? "bg-primary border-primary text-primary-foreground"
                                      : index === order.currentStep
                                      ? "bg-primary/20 border-primary text-primary animate-pulse"
                                      : "border-muted-foreground text-muted-foreground"
                                  }`}>
                                    <step.icon className="h-5 w-5" />
                                  </div>
                                  <p className={`text-xs mt-2 text-center max-w-16 ${
                                    index <= order.currentStep ? "text-primary font-medium" : "text-muted-foreground"
                                  }`}>
                                    {step.title}
                                  </p>
                                  {index < trackingSteps.length - 1 && (
                                    <div className={`absolute w-16 h-0.5 mt-5 ml-16 ${
                                      index < order.currentStep ? "bg-primary" : "bg-muted-foreground/30"
                                    }`} />
                                  )}
                                </div>
                              ))}
                            </div>
                            
                            <div className="mt-6 p-4 bg-secondary/50 rounded-lg">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="font-medium">Estimated Delivery:</span>
                                  <p className="text-primary">{new Date(order.estimatedDelivery).toLocaleDateString()}</p>
                                </div>
                                <div>
                                  <span className="font-medium">Courier:</span>
                                  <p>{order.courier}</p>
                                </div>
                                <div className="sm:col-span-2">
                                  <span className="font-medium">Tracking Number:</span>
                                  <p className="font-mono text-primary">{order.trackingNumber}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Delivery Information */}
                        {order.status === "Delivered" && (
                          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                            <div className="flex items-center gap-2 text-green-800 mb-2">
                              <CheckCircle className="h-5 w-5" />
                              <span className="font-semibold">Delivered Successfully</span>
                            </div>
                            <p className="text-sm text-green-700">
                              Delivered on {new Date(order.deliveredDate).toLocaleDateString()} via {order.courier}
                            </p>
                          </div>
                        )}

                        {/* Cancellation Information */}
                        {order.status === "Cancelled" && (
                          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                            <div className="flex items-center gap-2 text-red-800 mb-2">
                              <X className="h-5 w-5" />
                              <span className="font-semibold">Order Cancelled</span>
                            </div>
                            <p className="text-sm text-red-700">
                              Cancelled on {new Date(order.cancelledDate).toLocaleDateString()}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredOrders.length === 0 && (
              <div className="text-center py-12">
                <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Orders Found</h3>
                <p className="text-muted-foreground">
                  {searchQuery || statusFilter !== "All" 
                    ? "Try adjusting your search or filter criteria"
                    : "You haven't placed any orders yet"
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}