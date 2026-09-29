db.products.insertMany([
    {
        name: "Wireless Mouse",
        price: 799,
        category: "Electronics",
        stock: 120,
        ratings: 4.5,
        tags: ["computer", "accessory", "wireless"],
        createdAt: new Date()
    },
    {
        name: "Mechanical Keyboard",
        price: 2499,
        category: "Electronics",
        stock: 80,
        ratings: 4.8,
        tags: ["keyboard", "mechanical"],
        createdAt: new Date()
    },
    {
        name: "Gaming Laptop",
        price: 85999,
        category: "Computers",
        stock: 30,
        ratings: 4.6,
        tags: ["gaming", "laptop"],
        createdAt: new Date()
    }
])



db.orders.insertMany([
    {
        orderId: "ORD001",
        user: "John Doe",
        products: [
            {
                name: "Wireless Mouse",
                quantity: 1,
                price: 799
            },
            {
                name: "Mechanical Keyboard",
                quantity: 1,
                price: 2499
            }
        ],
        total: 3298,
        status: "Delivered",
        createdAt: new Date()
    },
    {
        orderId: "ORD002",
        user: "Jane Smith",
        products: [
            {
                name: "Gaming Laptop",
                quantity: 1,
                price: 85999
            }
        ],
        total: 85999,
        status: "Pending",
        createdAt: new Date()
    }
])

db.contacts.insertMany([
    {
        name: "Alice",
        message: "Loved your website!",
        phone: "9876543210",
        createdAt: new Date()
    },
    {
        name: "Bob",
        message: "Do you have discounts on laptops?",
        phone: "9123456789",
        createdAt: new Date()
    },
    {
        name: "Carol",
        message: "I want to cancel my order.",
        phone: "9988776655",
        createdAt: new Date()
    }
])
// Find all products
db.products.find()

// Pretty print
db.products.find().pretty()

// Find Electronics products
db.products.find({
    category: "Electronics"
})

// Price greater than 1000
db.products.find({
    price: {
        $gt: 1000
    }
})

// Price between 1000 and 50000
db.products.find({
    price: {
        $gte: 1000,
        $lte: 50000
    }
})

db.products.find({
    $or: [
        {
            category: "Electronics"
        },
        {
            stock: {
                $lt: 50
            }
        }
    ]
})


// AND
db.products.find({
    $and: [
        {
            category: "Electronics"
        },
        {
            price: {
                $gt: 500
            }
        }
    ]
})


// IN
db.products.find({
    category: {
        $in: ["Electronics", "Computers"]
    }
})


// Only name and price
db.products.find(
    {},
    {
        name: 1,
        price: 1,
        _id: 0
    }
)



db.products.find().sort({
    price: 1
})

// Descending
db.products.find().sort({
    price: -1
})

// Two most expensive products
db.products
    .find()
    .sort({
        price: -1
    })
    .limit(2)




// Update one
db.products.updateOne(
    {
        name: "Wireless Mouse"
    },
    {
        $set: {
            price: 899
        }
    }
)


// Update many
db.products.updateMany(
    {
        category: "Electronics"
    },
    {
        $inc: {
            stock: 10
        }
    }
)


// Add item to array
db.products.updateOne(
    {
        name: "Wireless Mouse"
    },
    {
        $push: {
            tags: "new"
        }
    }
)


// Remove item from array
db.products.updateOne(
    {
        name: "Wireless Mouse"
    },
    {
        $pull: {
            tags: "new"
        }
    }
)


// Remove a field
db.products.updateOne(
    {
        name: "Wireless Mouse"
    },
    {
        $unset: {
            ratings: ""
        }
    }
)

db.products.countDocuments()

db.products.countDocuments({
    category: "Electronics"
})


// Delete one
db.contacts.deleteOne({
    name: "Alice"
})

// Delete many
db.orders.deleteMany({
    status: "Delivered"
})


// Create index
db.products.createIndex({
    name: 1
})

// Create price index
db.products.createIndex({
    price: 1
})

// View indexes
db.products.getIndexes()

// Explain query performance
db.products.find({
    price: {
        $gt: 5000
    }
}).explain("executionStats")



db.orders.aggregate([
    {
        $group: {
            _id: null,
            totalRevenue: {
                $sum: "$total"
            }
        }
    }
])




db.orders.aggregate([
    {
        $group: {
            _id: "$status",
            totalOrders: {
                $sum: 1
            }
        }
    }
])


db.orders.aggregate([
    {
        $lookup: {
            from: "products",
            localField: "products.name",
            foreignField: "name",
            as: "productDetails"
        }
    }
])


// =====================================================
// 16. SALES COLLECTION
// =====================================================

db.sales.insertMany([
    {
        _id: 1,
        item: "Apple",
        price: 10,
        quantity: 5,
        category: "Fruit"
    },
    {
        _id: 2,
        item: "Banana",
        price: 5,
        quantity: 10,
        category: "Fruit"
    },
    {
        _id: 3,
        item: "Carrot",
        price: 8,
        quantity: 6,
        category: "Vegetable"
    },
    {
        _id: 4,
        item: "Tomato",
        price: 6,
        quantity: 8,
        category: "Vegetable"
    },
    {
        _id: 5,
        item: "Mango",
        price: 15,
        quantity: 3,
        category: "Fruit"
    }
])


// =====================================================
// 17. AGGREGATION - MATCH
// =====================================================

db.sales.aggregate([
    {
        $match: {
            category: "Fruit"
        }
    }
])


// =====================================================
// 18. AGGREGATION - GROUP
// =====================================================

db.sales.aggregate([
    {
        $group: {
            _id: "$category",
            totalItems: {
                $sum: "$quantity"
            }
        }
    }
])


// =====================================================
// 19. TOTAL QUANTITY
// =====================================================

db.sales.aggregate([
    {
        $group: {
            _id: null,
            totalQuantity: {
                $sum: "$quantity"
            }
        }
    }
])


// =====================================================
// 20. TOTAL REVENUE FROM SALES
// =====================================================

db.sales.aggregate([
    {
        $group: {
            _id: null,
            totalRevenue: {
                $sum: {
                    $multiply: [
                        "$price",
                        "$quantity"
                    ]
                }
            }
        }
    }
])


// =====================================================
// 21. REVENUE BY CATEGORY
// =====================================================

db.sales.aggregate([
    {
        $group: {
            _id: "$category",
            totalRevenue: {
                $sum: {
                    $multiply: [
                        "$price",
                        "$quantity"
                    ]
                }
            }
        }
    }
])


// =====================================================
// 22. SORT IN AGGREGATION
// =====================================================

db.sales.aggregate([
    {
        $sort: {
            price: -1
        }
    }
])


// =====================================================
// 23. LIMIT IN AGGREGATION
// =====================================================

db.sales.aggregate([
    {
        $sort: {
            price: -1
        }
    },
    {
        $limit: 3
    }
])


// =====================================================
// 24. PROJECT IN AGGREGATION
// =====================================================

db.sales.aggregate([
    {
        $project: {
            _id: 0,
            item: 1,
            price: 1
        }
    }
])


// =====================================================
// 25. MATCH + GROUP
// =====================================================

db.sales.aggregate([
    {
        $match: {
            category: "Fruit"
        }
    },
    {
        $group: {
            _id: null,
            totalQuantity: {
                $sum: "$quantity"
            }
        }
    }
])


// =====================================================
// 26. MATCH + GROUP + SORT
// =====================================================

db.sales.aggregate([
    {
        $match: {
            category: "Fruit"
        }
    },
    {
        $group: {
            _id: "$item",
            totalQuantity: {
                $sum: "$quantity"
            }
        }
    },
    {
        $sort: {
            totalQuantity: -1
        }
    }
])