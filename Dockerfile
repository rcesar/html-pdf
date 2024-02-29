FROM node:18.13.0

RUN apt-get install -y python3 make gcc g++ 

# Install google-chrome-stable
RUN apt-get update \
    && apt-get install -y wget gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

RUN apt-get install chromium-browser

WORKDIR /app

# Copy and setup your project 

COPY package.json /app/package.json

COPY package-lock.json /app

RUN npm i

COPY . /app

EXPOSE 3000

CMD [ "npm", "run", "start" ]