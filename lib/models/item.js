"use strict";

let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let ItemSchema = new Schema({
  
  // name of the item
  name: {
    type: String,
    trim: true,
    required: true
  },
  
  // the tags of this item
  tag: {
    type: [{
      type: String,
      lowercase: true
    }],
    required: true
  },
  
  // image information containing names and urls on s3
  images: [{
    name: {
      type: String,
      lowercase: true
    },
    url: String
  }],
  
  // unit number for this item
  unitNumber: {
    type: String,
    default: "1"
  },
  
  // unit name for this item
  unitName: {
    type: String,
    default: "1"
  },

  // unit type for this item
  unitType: {
    type: String,
    default: "1"
  },
  
  // last update date
  lastUpdate: {
    type: Date,
    default: Date.now
  },

  // details about this Item
  // composition, color, etc
  description: Schema.Types.Mixed,
  
  dimension: {
    
    width: {
      base: {
        type: Number,
        default: 100
      },
      customizable: {
        type: Boolean,
        default: false
      },
      min: {
        type: Number,
        required: false
      },
      max: {
        type: Number,
        required: false
      },
      pricePerUnit: {
        type: Number,
        required: false
      }
    },
    
    height: {
      base: {
        type: Number,
        default: 100
      },
      customizable: {
        type: Boolean,
        default: false
      },
      min: {
        type: Number,
        required: false
      },
      max: {
        type: Number,
        required: false
      },
      pricePerUnit: {
        type: Number,
        required: false
      }
    },
    
    depth: {
      base: {
        type: Number,
        default: 100
      },
      customizable: {
        type: Boolean,
        default: false
      },
      min: {
        type: Number,
        required: false
      },
      max: {
        type: Number,
        required: false
      },
      pricePerUnit: {
        type: Number,
        required: false
      }
    },
    
    // unit: pound
    weight: {
      type: Number,
      required: false
    }
  },
  
  price: {
    type: Number,
    required: true
  },
  
  stock: {
    type: Number,
    default: 3
  }
  
  // reviews, ref "Review"
  // on sale...

});

ItemSchema.pre("update", function() {
  this.update({}, {$set: { "lastUpdate": Date.now()}});
});

mongoose.model("Item", ItemSchema);
