from app import app
import os
port = int(os.environ.get('PORT', 5000))
print("Server running on port %s" % port)
app.run(debug = True, host = '0.0.0.0', port=port)