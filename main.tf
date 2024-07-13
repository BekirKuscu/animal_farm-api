provider "aws" {
  region = "eu-north-1"
}

resource "aws_key_pair" "animal_farm_key_pair" {
  key_name   = "animal-farm-key-pair"
  public_key = file("animal-farm-key-pair.pub")  # Adjust this path based on where the file is located
}

resource "aws_security_group" "animal_farm_sg" {
  name        = "animal-farm-sg"
  description = "Animal Farm Security Group"

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["<your_public_ip>/32"]  # Replace <your_public_ip> with your actual IP
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["<your_public_ip>/32"]  # Replace <your_public_ip> with your actual IP
  }

  egress {
    from_port       = 0
    to_port         = 0
    protocol        = "-1"
    cidr_blocks     = ["0.0.0.0/0"]
  }

  tags = {
    Name = "animal-farm-sg"
  }
}

resource "aws_instance" "animal_farm_instance" {
  ami             = "ami-0b72821e2f351e396"
  instance_type   = "t2.micro"
  key_name        = aws_key_pair.animal_farm_key_pair.key_name
  security_groups = [aws_security_group.animal_farm_sg.name]

  tags = {
    Name = "animal-farm-instance"
  }
}
