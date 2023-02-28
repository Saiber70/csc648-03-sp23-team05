# Credentials Folder

## The purpose of this folder is to store all credentials needed to log into your server and databases. This is important for many reasons. But the two most important reasons is
    1. Grading , servers and databases will be logged into to check code and functionality of application. Not changes will be unless directed and coordinated with the team.
    2. Help. If a class TA or class CTO needs to help a team with an issue, this folder will help facilitate this giving the TA or CTO all needed info AND instructions for logging into your team's server. 


# Below is a list of items required. Missing items will causes points to be deducted from multiple milestone submissions.

1. Server URL: ec2-54-177-178-242.us-west-1.compute.amazonaws.com Public IP: 54.177.178.242
2. SSH Username: ubuntu
3. SSH password/key (file included in credentials folder): "team05-key.pem"
4. Database URL: Port:
    <br><strong> NOTE THIS DOES NOT MEAN YOUR DATABASE NEEDS A PUBLIC FACING PORT.</strong> But knowing the IP and port number will help with SSH tunneling into the database. The default port is more than sufficient for this class.
6. Database username: 
7. Database password: 
8. Database name:
9. Instructions to connect to the server instance and launch website:
   1. Install ssh client.
      - "sudo apt install openssh-client"
   2. Download and store the private key file.
   3. Secure the key with the following command:
      - "chmod 400 team05-key.pem"
   5. 4. Use ssh to connect to the server instance using the above information.
      - "ssh -i "team05-key.pem" ubuntu@ec2-54-177-178-242.us-west-1.compute.amazonaws.com"
   6. Deploy web server using Server URL posted above.

# Most important things to Remember
## These values need to kept update to date throughout the semester. <br>
## <strong>Failure to do so will result it points be deducted from milestone submissions.</strong><br>
## You may store the most of the above in this README.md file. DO NOT Store the SSH key or any keys in this README.md file.
