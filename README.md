# CrowdAnalyzer_Task-

## Notes:

The folder contain Dockerfile and docker-compose.yml 
Don't run it as docker.compose.yml will show some error that unfortunately I can't solve as, I know the logic and the purpose of Docker, it is my first time to use docker

## How to Run App 

<ol>
  <li>First Elastic Search Setup, Unfortunately I used elasticsearch on localhost 
    <ul>
      <li>Download elasticsearch</li>
      <li>Open command prompt cd to it after un zip</li>
      <li>cd bin </li>
      <li>Then type elasticsearch.bat </li>
    </ul>
    <p>It should be up and running when server is running </p>
  </li>
  <li>This will upload conversations.json to elasticsearch creating Conversations index
  <ul>
      <li>Run "node elasticsearch_bulk.js"</li>
   </ul>
  </li>
  <li>"nodemon app.js"</li>
   <li> For Running TestCase 
  <ul>
      <li>"npm test"</li>
   </ul>
  </li>
</ol>
