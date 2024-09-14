#!/bin/bash

# Replace placeholders in environment.prod.ts.template
envsubst < src/environments/environment.prod.ts.template > src/environments/environment.prod.ts

# Build the Angular app
ng build --configuration production
