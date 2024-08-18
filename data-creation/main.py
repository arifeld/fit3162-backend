import json
import string

def getgeodata(data, title) -> dict:
    for venue in data:
        if venue["properties"]["name"] == title:
            return venue

def main():
    all_vendors_f = open("clayton-title-description.json", encoding="utf8")
    geojson_data_f = open("monash-clayton.geojson", encoding="utf8")
    
    output_f = open("clayton-output.json", "w", encoding="utf8")
    
    all_vendors = json.load(all_vendors_f)
    geojson_data = json.load(geojson_data_f)
    
    venues = geojson_data["features"]
    
    all_geojson_venues = [v["properties"]["name"] for v in venues]
    
    boolean_categories = [
        {
            "key": "wheelchair",
            "name": "Wheelchair Accessible"
        },
        {
            "key": "reservation",
            "name": "Accepts Reservations"
        },
        {
            "key": "diet:vegetarian",
            "name": "Vegetarian"
        },
        {
            "key": "diet:vegan",
            "name": "Vegan"  
        },
        {
            "key": "outdoor_seating",
            "name": "Outdoor Seating Available"
        },
        {
            "key": "takeaway",
            "name": "Takeaway"
        },
        {
            "key": "indoor_seating",
            "name": "Indoor Seating Available"
        }
    ]
    
    output = []
    
    for vendor in all_vendors:
        data = {
            "store_name": vendor["title"],
            "store_description": vendor["description"],
            "store_address_street": None,
            "store_address_suburb": "Clayton",
            "store_address_postcode": 3168,
            "store_geopoint": {
                "x": None,
                "y": None
            },
            "store_contact_phone": None,
            "store_contact_email": None,
            "store_contact_website": None,
            "categories": []
        }
        
        
        geo = getgeodata(venues, vendor["title"]) 
        if geo is None:
            output.append(data)
            continue
        
        prop = geo.get("properties")
        
        all_geojson_venues.remove(vendor["title"])
        
        data["store_address_street"] = (prop.get("addr:housenumber", "") + " " + prop.get("addr:street", " ")).strip()
        data["store_geopoint"] = {
            "x": geo.get("geometry").get("coordinates")[0],
            "y": geo.get("geometry").get("coordinates")[1]
        }
        
        data["store_contact_email"] = prop.get("email")
        data["store_contact_phone"] = prop.get("phone").replace(" ", "") if prop.get("phone") is not None else None
        data["store_contact_website"] = prop.get("website")
        
        if prop.get("amenity") == "fast_food":
            data["categories"].append("Fast Food")
        else:
            data["categories"].append(string.capwords(prop.get("amenity")))
        
        if prop.get("cuisine") is not None:
            data["categories"].append(string.capwords(prop.get("cuisine")))
        
        for category in boolean_categories:
            if category["key"] in prop:
                data["categories"].append(category["name"])
                
                
        
        output.append(data)


        
        
    json.dump(output, output_f, indent=4)    
        
    print(all_geojson_venues)
    all_vendors_f.close()
    geojson_data_f.close()
    output_f.close()
    
if __name__ == "__main__":
    main()