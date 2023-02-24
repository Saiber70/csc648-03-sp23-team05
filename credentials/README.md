# Credentials Folder

## The purpose of this folder is to store all credentials needed to log into your server and databases. This is important for many reasons. But the two most important reasons is
    1. Grading , servers and databases will be logged into to check code and functionality of application. Not changes will be unless directed and coordinated with the team.
    2. Help. If a class TA or class CTO needs to help a team with an issue, this folder will help facilitate this giving the TA or CTO all needed info AND instructions for logging into your team's server. 


# Below is a list of items required. Missing items will causes points to be deducted from multiple milestone submissions.

1. Server URL: ec2-50-18-71-109.us-west-1.compute.amazonaws.com, Public IP: 50.18.71.109
2. SSH Username: ubuntu
3. SSH password/key (file included in credentials folder): "group-5-key.pem"
4. Database URL: group-5-database.creq4wy6ghnn.us-west-1.rds.amazonaws.com, Port: 3306
    <br><strong> NOTE THIS DOES NOT MEAN YOUR DATABASE NEEDS A PUBLIC FACING PORT.</strong> But knowing the IP and port number will help with SSH tunneling into the database. The default port is more than sufficient for this class.
6. Database username: leyvam21
7. Database password: team5SQL
8. Database name: group5_db
9. Instructions to connect to the server instance:
   1. Install ssh client.
      - "sudo apt install openssh-client"
   2. Download and store the private key file.
   3. Use ssh to connect to the server instance using the above information.
      - "ssh -i "group-5-key.pem" ubuntu@ec2-50-18-71-109.us-west-1.compute.amazonaws.com"

# Most important things to Remember
## These values need to kept update to date throughout the semester. <br>
## <strong>Failure to do so will result it points be deducted from milestone submissions.</strong><br>
## You may store the most of the above in this README.md file. DO NOT Store the SSH key or any keys in this README.md file.
