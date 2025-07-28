# K8s 1.15.0 安装记录


## 环境

|hostname|ip|system||
|--|:--|:--|--|
|master|192.168.33.10| CentOS7||
|node1|192.168.33.11| CentOS7||
|node2|192.168.33.12| CentOS7||
|node3|192.168.33.13| CentOS7||
|node4|192.168.33.14| CentOS7||
|node5|192.168.33.15| CentOS7||

## 所有节点上操作

```shell
[root@master install]# cat preENV.sh

#!/bin/bash
# 关闭防火墙
systemctl stop firewalld && systemctl disable firewalld
# 关闭 SELINUX
setenforce 0 && sed -i "s/SELINUX=enforcing/SELINUX=disabled/g" /etc/selinux/config
# 关闭 Swap
swapoff -a && sed -i "s/\/dev\/mapper\/centos-swap/\#\/dev\/mapper\/centos-swap/g" /etc/fstab

[root@master ~]# vim /etc/sysctl.d/k8s.conf
[root@master ~]# cat /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_forward = 1

[root@master ~]# modprobe br_netfilter && sysctl -p /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_forward = 1

[root@master ~]# wget -O /etc/yum.repos.d/CentOS7-Aliyun.repo http://mirrors.aliyun.com/repo/Centos-7.repo
--2019-06-30 04:26:32--  http://mirrors.aliyun.com/repo/Centos-7.repo
Resolving mirrors.aliyun.com (mirrors.aliyun.com)... 116.177.250.229, 116.177.250.233, 60.28.226.4, ...
Connecting to mirrors.aliyun.com (mirrors.aliyun.com)|116.177.250.229|:80... connected.
HTTP request sent, awaiting response... 200 OK
Length: 2523 (2.5K) [application/octet-stream]
Saving to: ‘/etc/yum.repos.d/CentOS7-Aliyun.repo’

100%[============================================================================>] 2,523       --.-K/s   in 0s

2019-06-30 04:26:32 (296 MB/s) - ‘/etc/yum.repos.d/CentOS7-Aliyun.repo’ saved [2523/2523]
root@master ~]# sudo yum install -y yum-utils \
  device-mapper-persistent-data \
  lvm2

[root@master ~]# sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
[root@master ~]# yum install docker-ce -y
[root@master ~]# systemctl enable docker && systemctl start docker
Created symlink from /etc/systemd/system/multi-user.target.wants/docker.service to /usr/lib/systemd/system/docker.service.

[root@master ~]# mkdir -p /etc/docker
[root@master ~]# sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://gmjjwogo.mirror.aliyuncs.com"],
  "exec-opts": ["native.cgroupdriver=systemd"]
}
EOF

{
  "registry-mirrors": ["https://gmjjwogo.mirror.aliyuncs.com"],
  "exec-opts": ["native.cgroupdriver=systemd"]
}
[root@master ~]# sudo systemctl daemon-reload && sudo systemctl restart docker

[root@master ~]# docker info |grep Cgroup
Cgroup Driver: systemd

[root@master ~]# # kube-proxy 开启 ipvs 的前置条件
[root@master ~]# cat > /etc/sysconfig/modules/ipvs.modules <<EOF
#!/bin/bash
modprobe -- ip_vs
modprobe -- ip_vs_rr
modprobe -- ip_vs_wrr
modprobe -- ip_vs_sh
modprobe -- nf_conntrack_ipv4
EOF
[root@master ~]# chmod 755 /etc/sysconfig/modules/ipvs.modules && bash /etc/sysconfig/modules/ipvs.modules && lsmod | grep -e ip_vs -e nf_conntrack_ipv4
ip_vs_sh               12688  0
ip_vs_wrr              12697  0
ip_vs_rr               12600  0
ip_vs                 145497  6 ip_vs_rr,ip_vs_sh,ip_vs_wrr
nf_conntrack_ipv4      15053  2
nf_defrag_ipv4         12729  1 nf_conntrack_ipv4
nf_conntrack          133095  7 ip_vs,nf_nat,nf_nat_ipv4,xt_conntrack,nf_nat_masquerade_ipv4,nf_conntrack_netlink,nf_conntrack_ipv4
libcrc32c              12644  4 xfs,ip_vs,nf_nat,nf_conntrack

[root@master ~]# # 安装 kubernetes 初始化工具
[root@master ~]# # 使用阿里云的 kubernetes 源
[root@master ~]# cat <<EOF > /etc/yum.repos.d/kubernetes.repo
[kubernetes]
name=Kubernetes
baseurl=https://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64/
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg https://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF
[root@master ~]# # 安装 k8s 工具 1.15 版本
[root@master ~]# yum install -y kubelet kubeadm kubectl

Installed:
  kubeadm.x86_64 0:1.15.0-0              kubectl.x86_64 0:1.15.0-0              kubelet.x86_64 0:1.15.0-0

Dependency Installed:
  conntrack-tools.x86_64 0:1.4.4-4.el7                       cri-tools.x86_64 0:1.12.0-0
  kubernetes-cni.x86_64 0:0.7.5-0                            libnetfilter_cthelper.x86_64 0:1.0.0-9.el7
  libnetfilter_cttimeout.x86_64 0:1.0.0-6.el7                libnetfilter_queue.x86_64 0:1.0.2-2.el7_2
  socat.x86_64 0:1.7.3.2-2.el7

Complete!
[root@master ~]# # 启动 kubelet
[root@master ~]# systemctl enable kubelet && systemctl start kubelet
Created symlink from /etc/systemd/system/multi-user.target.wants/kubelet.service to /usr/lib/systemd/system/kubelet.service.
[root@master ~]#

```

## 主节点操作

```shell
[root@master install]# vim installK8sMasterImage.sh
[root@master install]# cat installK8sMasterImage.sh

#!/bin/bash

set -e

KUBE_VERSION=v1.15.0
KUBE_PAUSE_VERSION=3.1
ETCD_VERSION=3.3.10
CORE_DNS_VERSION=1.3.1

GCR_URL=k8s.gcr.io
ALIYUN_URL=registry.cn-hangzhou.aliyuncs.com/google_containers

images=(kube-proxy:${KUBE_VERSION}
kube-scheduler:${KUBE_VERSION}
kube-controller-manager:${KUBE_VERSION}
kube-apiserver:${KUBE_VERSION}
pause:${KUBE_PAUSE_VERSION}
etcd:${ETCD_VERSION}
coredns:${CORE_DNS_VERSION})

for imageName in ${images[@]} ; do
  docker pull $ALIYUN_URL/$imageName
  docker tag  $ALIYUN_URL/$imageName $GCR_URL/$imageName
  docker rmi $ALIYUN_URL/$imageName
done
[root@master install]# chmod +x installK8sMasterImage.sh && ./installK8sMasterImage.sh

root@master install]# kubeadm init --kubernetes-version=v1.15.0 --apiserver-advertise-address=192.168.33.10 --pod-network-cidr=10.244.0.0/16
[init] Using Kubernetes version: v1.15.0
[preflight] Running pre-flight checks
	[WARNING Hostname]: hostname "master" could not be reached
	[WARNING Hostname]: hostname "master": lookup master on 10.0.2.3:53: no such host
[preflight] Pulling images required for setting up a Kubernetes cluster
[preflight] This might take a minute or two, depending on the speed of your internet connection
[preflight] You can also perform this action in beforehand using 'kubeadm config images pull'
[kubelet-start] Writing kubelet environment file with flags to file "/var/lib/kubelet/kubeadm-flags.env"
[kubelet-start] Writing kubelet configuration to file "/var/lib/kubelet/config.yaml"
[kubelet-start] Activating the kubelet service
[certs] Using certificateDir folder "/etc/kubernetes/pki"
[certs] Generating "front-proxy-ca" certificate and key
[certs] Generating "front-proxy-client" certificate and key
[certs] Generating "ca" certificate and key
[certs] Generating "apiserver" certificate and key
[certs] apiserver serving cert is signed for DNS names [master kubernetes kubernetes.default kubernetes.default.svc kubernetes.default.svc.cluster.local] and IPs [10.96.0.1 192.168.33.10]
[certs] Generating "apiserver-kubelet-client" certificate and key
[certs] Generating "etcd/ca" certificate and key
[certs] Generating "etcd/server" certificate and key
[certs] etcd/server serving cert is signed for DNS names [master localhost] and IPs [192.168.33.10 127.0.0.1 ::1]
[certs] Generating "etcd/healthcheck-client" certificate and key
[certs] Generating "apiserver-etcd-client" certificate and key
[certs] Generating "etcd/peer" certificate and key
[certs] etcd/peer serving cert is signed for DNS names [master localhost] and IPs [192.168.33.10 127.0.0.1 ::1]
[certs] Generating "sa" key and public key
[kubeconfig] Using kubeconfig folder "/etc/kubernetes"
[kubeconfig] Writing "admin.conf" kubeconfig file
[kubeconfig] Writing "kubelet.conf" kubeconfig file
[kubeconfig] Writing "controller-manager.conf" kubeconfig file
[kubeconfig] Writing "scheduler.conf" kubeconfig file
[control-plane] Using manifest folder "/etc/kubernetes/manifests"
[control-plane] Creating static Pod manifest for "kube-apiserver"
[control-plane] Creating static Pod manifest for "kube-controller-manager"
[control-plane] Creating static Pod manifest for "kube-scheduler"
[etcd] Creating static Pod manifest for local etcd in "/etc/kubernetes/manifests"
[wait-control-plane] Waiting for the kubelet to boot up the control plane as static Pods from directory "/etc/kubernetes/manifests". This can take up to 4m0s
[apiclient] All control plane components are healthy after 26.502984 seconds
[upload-config] Storing the configuration used in ConfigMap "kubeadm-config" in the "kube-system" Namespace
[kubelet] Creating a ConfigMap "kubelet-config-1.15" in namespace kube-system with the configuration for the kubelets in the cluster
[upload-certs] Skipping phase. Please see --upload-certs
[mark-control-plane] Marking the node master as control-plane by adding the label "node-role.kubernetes.io/master=''"
[mark-control-plane] Marking the node master as control-plane by adding the taints [node-role.kubernetes.io/master:NoSchedule]
[bootstrap-token] Using token: z1uxfl.z8l2uo9v8x3dtdcu
[bootstrap-token] Configuring bootstrap tokens, cluster-info ConfigMap, RBAC Roles
[bootstrap-token] configured RBAC rules to allow Node Bootstrap tokens to post CSRs in order for nodes to get long term certificate credentials
[bootstrap-token] configured RBAC rules to allow the csrapprover controller automatically approve CSRs from a Node Bootstrap Token
[bootstrap-token] configured RBAC rules to allow certificate rotation for all node client certificates in the cluster
[bootstrap-token] Creating the "cluster-info" ConfigMap in the "kube-public" namespace
[addons] Applied essential addon: CoreDNS
[addons] Applied essential addon: kube-proxy

Your Kubernetes control-plane has initialized successfully!

To start using your cluster, you need to run the following as a regular user:

  mkdir -p $HOME/.kube
  sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
  sudo chown $(id -u):$(id -g) $HOME/.kube/config

You should now deploy a pod network to the cluster.
Run "kubectl apply -f [podnetwork].yaml" with one of the options listed at:
  https://kubernetes.io/docs/concepts/cluster-administration/addons/

Then you can join any number of worker nodes by running the following on each as root:

kubeadm join 192.168.33.10:6443 --token z1uxfl.z8l2uo9v8x3dtdcu \
    --discovery-token-ca-cert-hash sha256:5c725b5b384221d25aed03a02a142fe2442d76f6362673b72f349abffb18b6f2
[root@master ~]#
[root@master ~]# mkdir -p $HOME/.kube
[root@master ~]# sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
[root@master ~]# sudo chown $(id -u):$(id -g) $HOME/.kube/config
[root@master ~]# kubectl get pod -n kube-system -owide
NAME                             READY   STATUS    RESTARTS   AGE   IP          NODE     NOMINATED NODE   READINESS GATES
coredns-5c98db65d4-9g7dj         0/1     Pending   0          39s   <none>      <none>   <none>           <none>
coredns-5c98db65d4-f6h7d         0/1     Pending   0          39s   <none>      <none>   <none>           <none>
etcd-master                      1/1     Running   0          57s   10.0.2.15   master   <none>           <none>
kube-apiserver-master            1/1     Running   0          57s   10.0.2.15   master   <none>           <none>
kube-controller-manager-master   1/1     Running   0          57s   10.0.2.15   master   <none>           <none>
kube-proxy-n9tql                 1/1     Running   0          39s   10.0.2.15   master   <none>           <none>
kube-scheduler-master            1/1     Running   0          57s   10.0.2.15   master   <none>           <none>
[root@master ~]# wget https://raw.githubusercontent.com/coreos/flannel/62e44c867a2846fefb68bd5f178daf4da3095ccb/Documentation/kube-flannel.yml
--2019-06-30 06:47:53--  https://raw.githubusercontent.com/coreos/flannel/62e44c867a2846fefb68bd5f178daf4da3095ccb/Documentation/kube-flannel.yml
Resolving raw.githubusercontent.com (raw.githubusercontent.com)... 151.101.228.133
Connecting to raw.githubusercontent.com (raw.githubusercontent.com)|151.101.228.133|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 12306 (12K) [text/plain]
Saving to: ‘kube-flannel.yml’

100%[==============================================================================================>] 12,306      51.3KB/s   in 0.2s

2019-06-30 06:47:57 (51.3 KB/s) - ‘kube-flannel.yml’ saved [12306/12306]

[root@master install]# ll
total 24
-rwxr-xr-x. 1 root root   580 Jun 30 05:21 installK8sMasterImage.sh
-rw-r--r--. 1 root root 12306 Jun 30 05:26 kube-flannel.yml
-rwxr-xr-x. 1 root root   294 Jun 30 04:20 preENV.sh
[root@master install]# kubectl apply -f kube-flannel.yml
podsecuritypolicy.extensions/psp.flannel.unprivileged created
clusterrole.rbac.authorization.k8s.io/flannel created
clusterrolebinding.rbac.authorization.k8s.io/flannel created
serviceaccount/flannel created
configmap/kube-flannel-cfg created
daemonset.extensions/kube-flannel-ds-amd64 created
daemonset.extensions/kube-flannel-ds-arm64 created
daemonset.extensions/kube-flannel-ds-arm created
daemonset.extensions/kube-flannel-ds-ppc64le created
daemonset.extensions/kube-fla[root@master ~]# kubectl get pod -n kube-system -owide
NAME                             READY   STATUS    RESTARTS   AGE     IP           NODE     NOMINATED NODE   READINESS GATES
coredns-5c98db65d4-9g7dj         1/1     Running   0          5m42s   10.244.0.3   master   <none>           <none>
coredns-5c98db65d4-f6h7d         1/1     Running   0          5m42s   10.244.0.2   master   <none>           <none>
etcd-master                      1/1     Running   0          6m      10.0.2.15    master   <none>           <none>
kube-apiserver-master            1/1     Running   0          6m      10.0.2.15    master   <none>           <none>
kube-controller-manager-master   1/1     Running   0          6m      10.0.2.15    master   <none>           <none>
kube-flannel-ds-amd64-lbprc      1/1     Running   0          84s     10.0.2.15    master   <none>           <none>
kube-proxy-n9tql                 1/1     Running   0          5m42s   10.0.2.15    master   <none>           <none>
kube-scheduler-master            1/1     Running   0          6m      10.0.2.15    master   <none>           <none>
[root@master install]# # 查看当前集群状态
[root@master ~]# kubectl get node -A
NAME     STATUS   ROLES    AGE     VERSION
master   Ready    master   6m29s   v1.15.0
[root@master ~]#
```

## 各 Node 节点上处理

```shell
[root@node2 install]# vim installK8sNodeImage.sh
[root@node5 install]# cat installK8sNodeImage.sh

#!/bin/bash

set -e

KUBE_VERSION=v1.15.0
KUBE_PAUSE_VERSION=3.1
CORE_DNS_VERSION=1.3.1

GCR_URL=k8s.gcr.io
ALIYUN_URL=registry.cn-hangzhou.aliyuncs.com/google_containers

images=(kube-proxy:${KUBE_VERSION}
pause:${KUBE_PAUSE_VERSION}
coredns:${CORE_DNS_VERSION})

for imageName in ${images[@]} ; do
  docker pull $ALIYUN_URL/$imageName
  docker tag  $ALIYUN_URL/$imageName $GCR_URL/$imageName
  docker rmi $ALIYUN_URL/$imageName
done
[root@node1 ~]# chmod +x installK8sNodeImage.sh  && ./installK8sNodeImage.sh
v1.15.0: Pulling from google_containers/kube-proxy
39fafc05754f: Pull complete
db3f71d0eb90: Pull complete
b593bfa65f6f: Pull complete
Digest: sha256:7b94921f1c64876d3663698ade724fce79b417b32f0e1053976ca68a18fc0cba
Status: Downloaded newer image for registry.cn-hangzhou.aliyuncs.com/google_containers/kube-proxy:v1.15.0
Untagged: registry.cn-hangzhou.aliyuncs.com/google_containers/kube-proxy:v1.15.0
Untagged: registry.cn-hangzhou.aliyuncs.com/google_containers/kube-proxy@sha256:7b94921f1c64876d3663698ade724fce79b417b32f0e1053976ca68a18fc0cba
3.1: Pulling from google_containers/pause
cf9202429979: Pull complete
Digest: sha256:759c3f0f6493093a9043cc813092290af69029699ade0e3dbe024e968fcb7cca
Status: Downloaded newer image for registry.cn-hangzhou.aliyuncs.com/google_containers/pause:3.1
Untagged: registry.cn-hangzhou.aliyuncs.com/google_containers/pause:3.1
Untagged: registry.cn-hangzhou.aliyuncs.com/google_containers/pause@sha256:759c3f0f6493093a9043cc813092290af69029699ade0e3dbe024e968fcb7cca
1.3.1: Pulling from google_containers/coredns
e0daa8927b68: Pull complete
3928e47de029: Pull complete
Digest: sha256:638adb0319813f2479ba3642bbe37136db8cf363b48fb3eb7dc8db634d8d5a5b
Status: Downloaded newer image for registry.cn-hangzhou.aliyuncs.com/google_containers/coredns:1.3.1
Untagged: registry.cn-hangzhou.aliyuncs.com/google_containers/coredns:1.3.1
Untagged: registry.cn-hangzhou.aliyuncs.com/google_containers/coredns@sha256:638adb0319813f2479ba3642bbe37136db8cf363b48fb3eb7dc8db634d8d5a5b
[root@node1 ~]#
[root@node5 install]# # Node 加入集群

[root@node1 install]# kubeadm join 192.168.33.10:6443 --token sofcoc.j1it9gvn4uxpduo5 \
>     --discovery-token-ca-cert-hash sha256:3a9b79bd92f66a6284322ade27732932888c0f99884596d5f2c9a03d272e475b
[preflight] Running pre-flight checks
[preflight] Reading configuration from the cluster...
[preflight] FYI: You can look at this config file with 'kubectl -n kube-system get cm kubeadm-config -oyaml'
[kubelet-start] Downloading configuration for the kubelet from the "kubelet-config-1.15" ConfigMap in the kube-system namespace
[kubelet-start] Writing kubelet configuration to file "/var/lib/kubelet/config.yaml"
[kubelet-start] Writing kubelet environment file with flags to file "/var/lib/kubelet/kubeadm-flags.env"
[kubelet-start] Activating the kubelet service
[kubelet-start] Waiting for the kubelet to perform the TLS Bootstrap...

This node has joined the cluster:
* Certificate signing request was sent to apiserver and a response was received.
* The Kubelet was informed of the new secure connection details.

Run 'kubectl get nodes' on the control-plane to see this node join the cluster.

[root@node1 install]#

```

## master 节点操作

```shell
[root@master ~]# #将 master 节点也作为工作节点进行 pod 部署
[root@master ~]# kubectl taint nodes master node-role.kubernetes.io/master-
node/master untainted
```

## 打 label

```shell
[root@master temp]# kubectl label node master nodename=master
node/master labeled
[root@master temp]# kubectl label node node1 nodename=node1
node/node1 labeled
[root@master temp]# kubectl label node node2 nodename=node2
node/node2 labeled
[root@master temp]# kubectl label node node3 nodename=node3
node/node3 labeled
[root@master temp]# kubectl label node node4 nodename=node4
node/node4 labeled
[root@master temp]# kubectl label node node5 nodename=node5
node/node5 labeled
```

## 测试

```shell
vim nginx-deployment.yaml

```

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx
spec:
  replicas: 1
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.7.9
        imagePullPolicy: IfNotPresent
        ports:
        - containerPort: 80
          name: web
          protocol: TCP
      nodeSelector:
        nodename: master
---
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
  labels:
    app: nginx
spec:
  ports:
  - port: 80
    targetPort: 8080
    name: web
  selector:
    app-name: nginx
---
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: nginx
  namespace: default
spec:
  rules:
  - host: c4.k8s.com
    http:
      paths:
      - path: /nginx
        backend:
          serviceName: nginx-service
          servicePort: 8080
```

```shell
[root@master temp]# kubectl apply -f nginx-deployment.yaml
deployment.apps/nginx-deployment created
service/nginx-service created
ingress.extensions/nginx created
[root@master temp]# kubectl get service/nginx-service
NAME            TYPE        CLUSTER-IP    EXTERNAL-IP   PORT(S)   AGE
nginx-service   ClusterIP   10.100.2.78   <none>        80/TCP    38s
[root@master temp]# kubectl get ing
NAME    HOSTS        ADDRESS   PORTS   AGE
nginx   c4.k8s.com             80      4m5s
[root@master temp]# wget c4.k8s.com
--2019-06-30 07:12:18--  http://c4.k8s.com/
Resolving c4.k8s.com (c4.k8s.com)... 208.73.211.177, 208.73.210.202, 208.73.211.165, ...
Connecting to c4.k8s.com (c4.k8s.com)|208.73.211.177|:80... connected.
HTTP request sent, awaiting response... 302 Found : Moved Temporarily
Location: http://1223.dragonparking.com/?site=c4.k8s.com [following]
--2019-06-30 07:12:19--  http://1223.dragonparking.com/?site=c4.k8s.com
Resolving 1223.dragonparking.com (1223.dragonparking.com)... 46.51.238.1
Connecting to 1223.dragonparking.com (1223.dragonparking.com)|46.51.238.1|:80... connected.
HTTP request sent, awaiting response... 302 Moved Temporarily
Location: http://park.zunmi.cn/?acct=1223&site=c4.k8s.com [following]
--2019-06-30 07:12:21--  http://park.zunmi.cn/?acct=1223&site=c4.k8s.com
Resolving park.zunmi.cn (park.zunmi.cn)... 52.197.205.2
Connecting to park.zunmi.cn (park.zunmi.cn)|52.197.205.2|:80... connected.
HTTP request sent, awaiting response... 200 OK
Length: 1020 [text/html]
Saving to: ‘index.html’

100%[======================================================================================================================================>] 1,020       --.-K/s   in 0s

2019-06-30 07:12:22 (93.5 MB/s) - ‘index.html’ saved [1020/1020]

[root@master temp]# ll
total 8
-rw-r--r--. 1 root root 1020 May  6 23:28 index.html
-rw-r--r--. 1 root root  908 Jun 30 07:07 nginx-deployment.yaml
[root@master temp]# kubectl delete -f nginx-deployment.yaml
deployment.apps "nginx-deployment" deleted
service "nginx-service" deleted
ingress.extensions "nginx" deleted

```

## 引用

* [1. 博客：https://guzhongren.github.io/](https://guzhongren.github.io/)
* [2. 图床：https://sm.ms/](https://sm.ms/)
* [3. 原文：https://yq.aliyun.com/articles/706912?spm=a2c4e.11155435.0.0.59853312vRSRSj](https://yq.aliyun.com/articles/706912?spm=a2c4e.11155435.0.0.59853312vRSRSj)

## 免责声明

本文仅代表个人观点，与本人所供职的公司无任何关系。

