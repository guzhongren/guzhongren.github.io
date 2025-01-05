# Home Assistant搭建和配置并配置米家集成极简教程

## 小米发布Home Assistant 集成
2024年底，小米突然在 GitHub 上开源了[基于Home Assistant的米家集成](https://github.com/XiaoMi/ha_xiaomi_home)，顿时引起热议，正好我家里也是小米的设备，并且也是个Home Assistant 小白，所以正好可以探索一波。

因为网上有很多关于Home Assistant的说明及安装教程, 在这推荐[正是入坑好时节：在米家官方支持之际，再聊新人 Home Assistant 入门](https://sspai.com/post/95117)，我就不赘述了。

## 基于 Docker 的Home Assistant 安装并集成小米集成

```sh
# 创建本地路径用于挂在其道 Docker container 中
mkdir -p home-assistant/custom_components/hacs

# 启动 Home assistant 最新的镜像
## 设置时区
## 配置目录映射
docker run -d \
  --name homeassistant \
  --privileged \
  --restart=unless-stopped \
  -e TZ=Asia/Shanghai \
  -v ~/home-assistant:/config \
  --network=host \
homeassistant/home-assistant

# 在容器中安装HACS
docker exec -it homeassistant sh -c "mkdir -p /config/custom_components && cd /config/custom_components && wget -O - https://get.hacs.xyz | bash -"


##===NOT IMPORTANT===
# Restart HA
# `Add Intergration` to use HACS
# Authrizate HACS with GitHub
# Add `Custom repositories`
# Download
# `Add Intergration` to use Xiaomi Home

# Auth via OAuth2 of xiaomi
# Chose phone or email
# Change url of `homeassistant.local` to localhost

```

在正确操作如上步骤，重启Home Assistant 容器之后，访问 http://localhost:8123/ 就可以体验连接了自己家的小米账号的 Home Assistant 了。

## 总结

小米发布的 Home Assistant集成确实很简单，实用, 就像大家说的，通过这次开源和发布，小米已经在家庭物联网这块占据了领导地位，为其后续各种设备集成，扩展奠定了坚实的基础。

如果小米后续推出其 NAS 集成，肯定又会收割一波 `流量`。

## Refs

* [博客:https://guzhongren.github.io/](https://guzhongren.github.io/)
* [正是入坑好时节：在米家官方支持之际，再聊新人 Home Assistant 入门](https://sspai.com/post/95117)
* [基于Home Assistant的米家集成](https://github.com/XiaoMi/ha_xiaomi_home)
* [HACS](https://github.com/hacs/get)
* [Configuration options](https://www.hacs.xyz/docs/use/configuration/options/#to-change-the-hacs-configuration-options)

## Disclaimer

本文仅代表个人观点，与 [Thoughtworks](https://www.Thoughtworks.com/) 公司无任何关系。

----
![谷哥说-微信公众号](https://cdn.jsdelivr.net/gh/guzhongren/data-hosting@main/20210819/wechat.ae9zxgscqcg.png)
> [SHA256](https://emn178.github.io/online-tools/sha256_checksum.html) checksum: f2fe1394e4ab9297ed69ff73ac32e9ac1375f01c2102183b509bf9379a5995d6

## 赞助

![PayForGuzhongren](/images/pay/PayForGuzhongren.svg)
> [SHA256](https://emn178.github.io/online-tools/sha256_checksum.html) checksum: 964978ecd2059064abe542e51dc02e204d3ee2e6c320ca68e2b1399ce0c6953c

> 使用此[文件](https://guzhongren.github.io/images/pay/payforguzhongren.svg.sig)进行校验： `gpg --verify PayForGuzhongren.svg.sig`

