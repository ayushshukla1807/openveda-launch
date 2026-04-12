provider "aws" {
  region = "ap-south-1" # Mumbai Region Lockdown
}

# --- AWS Account Placeholder Policy ---
# Use 123456789012 in IaC for confidentiality.
# Inject real IDs via CI/CD secrets.

# --- VPC & Networking ---
resource "aws_vpc" "openveda_vpc" {
  cidr_block = "10.0.0.0/16"
  enable_dns_support = true
  enable_dns_hostnames = true
  tags = { Name = "openveda-vpc" }
}

resource "aws_subnet" "openveda_public" {
  vpc_id = aws_vpc.openveda_vpc.id
  cidr_block = "10.0.1.0/24"
  map_public_ip_on_launch = true
  tags = { Name = "openveda-public-abc" }
}

resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.openveda_vpc.id
}

resource "aws_route_table" "public_rt" {
  vpc_id = aws_vpc.openveda_vpc.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }
}

resource "aws_route_table_association" "public_assoc" {
  subnet_id = aws_subnet.openveda_public.id
  route_table_id = aws_route_table.public_rt.id
}

# --- ECS Cluster ---
resource "aws_ecs_cluster" "openveda_cluster" {
  name = "openveda-production"
}

# --- IAM Roles for ECS ---
resource "aws_iam_role" "ecs_task_execution_role" {
  name = "openveda-ecs-task-execution"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = { Service = "ecs-tasks.amazonaws.com" }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "ecs_execution_policy" {
  role = aws_iam_role.ecs_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

# --- Security Groups ---
resource "aws_security_group" "ecs_sg" {
  name = "openveda-ecs-sg"
  vpc_id = aws_vpc.openveda_vpc.id

  ingress {
    from_port = 80
    to_port = 80
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# --- CloudWatch Logs ---
resource "aws_cloudwatch_log_group" "openveda_logs" {
  name = "/ecs/openveda-web"
  retention_in_days = 30
}

# --- Output ---
output "vpc_id" {
  value = aws_vpc.openveda_vpc.id
}

output "ecs_cluster_name" {
  value = aws_ecs_cluster.openveda_cluster.name
}
