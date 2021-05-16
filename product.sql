-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- 主机： localhost
-- 生成日期： 2021-05-17 00:27:01
-- 服务器版本： 5.7.26
-- PHP 版本： 7.3.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `huawei`
--

-- --------------------------------------------------------

--
-- 表的结构 `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL COMMENT '商品id',
  `title` varchar(255) NOT NULL COMMENT '商品标题',
  `title2` varchar(255) NOT NULL COMMENT '二级标题',
  `title3` text NOT NULL COMMENT '商品详情',
  `price` float NOT NULL COMMENT '商品价格',
  `color` varchar(255) NOT NULL COMMENT '颜色',
  `num` int(11) NOT NULL COMMENT '商品数量',
  `picture` text NOT NULL COMMENT '商品图片'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `product`
--

INSERT INTO `product` (`id`, `title`, `title2`, `title3`, `price`, `color`, `num`, `picture`) VALUES
(1, 'FreeBuds 4i', '享3期免息', '【新品】HUAWEI FreeBuds 4i 无线耳机（陶瓷白）主动降噪 通话降噪 环境音透传 10小时连续播放 快充长续航 纯净音质', 499, '[{\"color\":\"陶瓷白\"},{\"color\":\"碳晶黑\"},{\"color\":\"蜜语红\"}]', 123, '[{ \"src\": \"../img/index/gird-items2.png\"}, { \"src\": \"../img/index/gird-items2-1.png\"}, { \"src\": \"../img/index/gird-items2-2.png\"}, { \"src\": \"../img/index/gird-items2-3.png\"}, { \"src\": \"../img/index/gird-items2-4.png\"}, { \"src\": \"../img/index/gird-items2-5.png\"}, { \"src\": \"../img/index/gird-items2-6.png\"}]'),
(5, 'OGAWA奥佳华家用按摩椅', '丰富指压技法', 'OGAWA奥佳华家用按摩椅 OG7306 太空灰（支持HUAWEI HiLink', 8299, '[{\"color\":\"太空灰\"},{\"color\":\"烈艳红\"},{\"color\":\"阮阳黄\"}]', 111, '[{ \"src\": \"../img/index/gird-items4.png\"}, { \"src\": \"../img/index/gird-items4-1.png\"}, { \"src\": \"../img/index/gird-items4-2.png\"}, { \"src\": \"../img/index/gird-items4-3.png\"}, { \"src\": \"../img/index/gird-items4-4.png\"}, { \"src\": \"../img/index/gird-items4-5.png\"}, { \"src\": \"../img/index/gird-items4-6.png\"}]'),
(4, 'HUAWEI Mate 40E 5G', 'Mate 40系列新品上市', 'HUAWEI Mate 40E 5G 全网通 8GB+128GB（釉白色）', 4599, '[{\"color\":\"亮黑色\"},{\"color\":\"釉白色\"},{\"color\":\"秘银色\"}]', 111, '[{ \"src\": \"../img/index/gird-items3.png\"}, { \"src\": \"../img/index/gird-items3-1.png\"}, { \"src\": \"../img/index/gird-items3-2.png\"}, { \"src\": \"../img/index/gird-items3-3.png\"}, { \"src\": \"../img/index/gird-items3-4.png\"}, { \"src\": \"../img/index/gird-items3-5.png\"}, { \"src\": \"../img/index/gird-items3-6.png\"}]'),
(6, ' FreeBuds 3', '享6期免息', '【有线充版】HUAWEI FreeBuds 3 无线耳机（陶瓷白）麒麟A1芯片 主动降噪 快充长续航', 899, '[{\"color\":\"陶瓷白\"},{\"color\":\"碳晶黑\"},{\"color\":\"蜜语红\"}]', 111, '[{ \"src\": \"../img/index/gird-items5.png\"}, { \"src\": \"../img/index/gird-items5-1.png\"}, { \"src\": \"../img/index/gird-items5-2.png\"}, { \"src\": \"../img/index/gird-items5-3.png\"}, { \"src\": \"../img/index/gird-items5-4.png\"}, { \"src\": \"../img/index/gird-items5-5.png\"}, { \"src\": \"../img/index/gird-items5-6.png\"}]'),
(7, 'HUAWEI P40 Pro+ 5G', '五摄', 'HUAWEI P40 Pro+ 5G 全网通 8GB+256GB（陶瓷白）', 7988, '[{\"color\":\"陶瓷白\"},{\"color\":\"碳晶黑\"},{\"color\":\"gogogo\"}]', 111, '[{ \"src\": \"../img/index/gird-items6.png\"}, { \"src\": \"../img/index/gird-items6-1.png\"}, { \"src\": \"../img/index/gird-items6-2.png\"}, { \"src\": \"../img/index/gird-items6-3.png\"}, { \"src\": \"../img/index/gird-items6-4.png\"}, { \"src\": \"../img/index/gird-items6-5.png\"}, { \"src\": \"../img/index/gird-items6-6.png\"}]'),
(8, 'HUAWEI Mate 30E Pro 5G', '超感光徕卡电影影像', 'HUAWEI Mate 30E Pro 5G 全网通 8GB+128GB（丹霞橙）', 5299, '[{\"color\":\"丹霞橙\"},{\"color\":\"翡翠冷\"},{\"color\":\"青山黛\"}]', 111, '[{ \"src\": \"../img/index/gird-items7.png\"}, { \"src\": \"../img/index/gird-items7-1.png\"}, { \"src\": \"../img/index/gird-items7-2.png\"}, { \"src\": \"../img/index/gird-items7-3.png\"}, { \"src\": \"../img/index/gird-items7-4.png\"}, { \"src\": \"../img/index/gird-items7-5.png\"}, { \"src\": \"../img/index/gird-items7-6.png\"}]'),
(9, '酷轻松疗护膝', '智能恒温，激活膝动力', '酷轻松石墨烯远红外理疗护膝 PMA-O30 深灰色（支持HUAWEI HiLink）', 259, '[{\"color\":\"碳晶黑\"},{\"color\":\"无\"},{\"color\":\"无\"}]', 111, '[{ \"src\": \"../img/index/gird-items8.png\"}, { \"src\": \"../img/index/gird-items8-1.png\"}, { \"src\": \"../img/index/gird-items8-2.png\"}, { \"src\": \"../img/index/gird-items8-3.png\"}, { \"src\": \"../img/index/gird-items8-4.png\"}, { \"src\": \"../img/index/gird-items8-5.png\"}, { \"src\": \"../img/index/gird-items8-6.png\"}]'),
(10, 'nova 8', '5G热卖', 'HUAWEI nova 8 8GB+128GB 全网通版（亮黑色）', 3099, '\r\n[{\"color\":\"亮黑色\"},{\"color\":\"8号色\"},{\"color\":\"普罗旺斯\"}]', 111, '[{ \"src\": \"../img/index/gird-items9.png\"}, { \"src\": \"../img/index/gird-items9-1.png\"}, { \"src\": \"../img/index/gird-items9-2.png\"}, { \"src\": \"../img/index/gird-items9-3.png\"}, { \"src\": \"../img/index/gird-items9-4.png\"}, { \"src\": \"../img/index/gird-items9-5.png\"}, { \"src\": \"../img/index/gird-items9-6.png\"}]');

--
-- 转储表的索引
--

--
-- 表的索引 `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '商品id', AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
