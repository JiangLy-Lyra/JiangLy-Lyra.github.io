"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import {
  Search,
  MapPin,
  Star,
  Shuffle,
  Home,
  Map,
  Zap,
  Clock,
  X,
  Utensils,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Send,
  ThumbsUp,
  MessageCircle,
  Building2,
  Coffee,
  Flame,
  IceCreamCone,
  CupSoda,
  Pizza,
  Salad,
  UtensilsCrossed,
  Ticket,
  Users,
  BookOpen,
  Heart,
  Timer,
  BadgePercent,
  Crown,
  Wifi,
  Volume2,
  Armchair,
} from "lucide-react";

/* ───────────────────────── Types ───────────────────────── */

interface Restaurant {
  id: number;
  name: string;
  image: string;
  rating: number;
  price: number;
  distance: string;
  tags: string[];
  category: string;
  campus: string;
  deal?: string;
}

interface Comment {
  id: string;
  restaurantId: number;
  author: string;
  avatar: string;
  rating: number;
  content: string;
  time: string;
  likes: number;
}

interface CampusPin {
  name: string;
  x: number;
  y: number;
  color: string;
}

/* ───────────────────────── Campus Data ───────────────────────── */

const campuses: CampusPin[] = [
  { name: "小美大学", x: 18, y: 22, color: "#f97316" },
  { name: "团团大学", x: 72, y: 18, color: "#8b5cf6" },
  { name: "袋鼠大学", x: 25, y: 68, color: "#06b6d4" },
  { name: "小象大学", x: 75, y: 65, color: "#ec4899" },
];

/* ───────────────────────── Mock Restaurants ───────────────────────── */

const mockRestaurants: Restaurant[] = [
  { id: 1, name: "牛肉面研究所", image: "https://images.unsplash.com/photo-1555126634-323283e090fa?w=600&h=400&fit=crop", rating: 4.9, price: 18, distance: "距小美二教步行3分钟", tags: ["出餐快", "一人食"], category: "简餐", campus: "小美大学" },
  { id: 2, name: "翠竹轩中餐厅", image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&h=400&fit=crop", rating: 4.7, price: 35, distance: "距小美图书馆步行5分钟", tags: ["有插座", "社团聚餐"], category: "中餐", campus: "小美大学" },
  { id: 3, name: "二食堂麻辣烫", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&h=400&fit=crop", rating: 4.5, price: 15, distance: "距小美宿舍楼步行2分钟", tags: ["出餐快", "一人食", "吃土专区"], category: "简餐", campus: "小美大学" },
  { id: 4, name: "学苑咖啡轻食", image: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=600&h=400&fit=crop", rating: 4.6, price: 28, distance: "距小美行政楼步行4分钟", tags: ["有插座", "期末自习"], category: "轻食", campus: "小美大学" },
  { id: 5, name: "日日鲜水饺馆", image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=600&h=400&fit=crop", rating: 4.3, price: 12, distance: "距小美一教步行1分钟", tags: ["出餐快", "一人食", "吃土专区"], category: "简餐", campus: "小美大学" },
  { id: 6, name: "三食堂盖浇饭", image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&h=400&fit=crop", rating: 4.2, price: 10, distance: "距小美三教步行2分钟", tags: ["出餐快", "一人食", "吃土专区"], category: "简餐", campus: "小美大学" },
  { id: 7, name: "鲜茶物语奶茶", image: "https://images.unsplash.com/photo-1558857563-b371033873b8?w=600&h=400&fit=crop", rating: 4.7, price: 16, distance: "距小美二教步行3分钟", tags: ["出餐快", "一人食"], category: "饮品", campus: "小美大学" },
  { id: 8, name: "小美夜市烧烤", image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=400&fit=crop", rating: 4.4, price: 45, distance: "距小美南门步行6分钟", tags: ["社团聚餐", "出餐快"], category: "烧烤", campus: "小美大学" },
  { id: 9, name: "拾光书咖", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=400&fit=crop", rating: 4.8, price: 32, distance: "距小美图书馆步行1分钟", tags: ["有插座", "期末自习", "一人食"], category: "咖啡", campus: "小美大学" },
  { id: 10, name: "一碗粥道", image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&h=400&fit=crop", rating: 4.1, price: 8, distance: "距小美宿舍楼步行1分钟", tags: ["出餐快", "一人食", "吃土专区"], category: "简餐", campus: "小美大学" },
  { id: 11, name: "美味关东煮", image: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=600&h=400&fit=crop", rating: 4.3, price: 14, distance: "距小美体育馆步行3分钟", tags: ["出餐快", "一人食", "吃土专区"], category: "简餐", campus: "小美大学" },
  { id: 12, name: "川味小馆", image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=600&h=400&fit=crop", rating: 4.6, price: 25, distance: "距小美南门步行4分钟", tags: ["社团聚餐", "出餐快"], category: "中餐", campus: "小美大学" },
  { id: 13, name: "川渝老火锅", image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&h=400&fit=crop", rating: 4.8, price: 68, distance: "距团团南门步行8分钟", tags: ["社团聚餐"], category: "火锅", campus: "团团大学" },
  { id: 14, name: "望月西餐厅", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop", rating: 4.9, price: 88, distance: "距团团西门步行10分钟", tags: ["社团聚餐"], category: "西餐", campus: "团团大学" },
  { id: 15, name: "团团一食堂", image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&h=400&fit=crop", rating: 4.0, price: 9, distance: "距团团宿舍楼步行1分钟", tags: ["出餐快", "一人食", "吃土专区"], category: "简餐", campus: "团团大学" },
  { id: 16, name: "烤肉大魔王", image: "https://images.unsplash.com/photo-1558030006-450675393462?w=600&h=400&fit=crop", rating: 4.7, price: 78, distance: "距团团北门步行7分钟", tags: ["社团聚餐"], category: "烧烤", campus: "团团大学" },
  { id: 17, name: "深夜食堂", image: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=600&h=400&fit=crop", rating: 4.5, price: 22, distance: "距团团图书馆步行5分钟", tags: ["期末自习", "一人食"], category: "简餐", campus: "团团大学" },
  { id: 18, name: "兰州拉面王", image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=600&h=400&fit=crop", rating: 4.2, price: 13, distance: "距团团二教步行2分钟", tags: ["出餐快", "一人食", "吃土专区"], category: "简餐", campus: "团团大学" },
  { id: 19, name: "知行咖啡馆", image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&h=400&fit=crop", rating: 4.8, price: 30, distance: "距团团图书馆步行2分钟", tags: ["有插座", "期末自习", "一人食"], category: "咖啡", campus: "团团大学" },
  { id: 20, name: "团团铁板烧", image: "https://images.unsplash.com/photo-1532347231146-80afc9e3df2b?w=600&h=400&fit=crop", rating: 4.4, price: 55, distance: "距团团体育馆步行4分钟", tags: ["社团聚餐", "出餐快"], category: "日料", campus: "团团大学" },
  { id: 21, name: "黄焖鸡米饭", image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&h=400&fit=crop", rating: 4.1, price: 15, distance: "距团团三教步行3分钟", tags: ["出餐快", "一人食", "吃土专区"], category: "简餐", campus: "团团大学" },
  { id: 22, name: "团团甜品站", image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&h=400&fit=crop", rating: 4.6, price: 20, distance: "距团团宿舍楼步行2分钟", tags: ["一人食", "出餐快"], category: "甜品", campus: "团团大学" },
  { id: 23, name: "麻辣香锅坊", image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&h=400&fit=crop", rating: 4.5, price: 32, distance: "距团团南门步行5分钟", tags: ["社团聚餐", "出餐快"], category: "中餐", campus: "团团大学" },
  { id: 24, name: "韩式拌饭屋", image: "https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=600&h=400&fit=crop", rating: 4.4, price: 22, distance: "距袋鼠体育馆步行6分钟", tags: ["出餐快", "一人食"], category: "简餐", campus: "袋鼠大学" },
  { id: 25, name: "袋鼠自习咖啡", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop", rating: 4.9, price: 35, distance: "距袋鼠图书馆步行1分钟", tags: ["有插座", "期末自习", "一人食"], category: "咖啡", campus: "袋鼠大学" },
  { id: 26, name: "袋鼠二食堂", image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=400&fit=crop", rating: 4.0, price: 11, distance: "距袋鼠宿舍楼步行2分钟", tags: ["出餐快", "一人食", "吃土专区"], category: "简餐", campus: "袋鼠大学" },
  { id: 27, name: "泰香园", image: "https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=600&h=400&fit=crop", rating: 4.6, price: 40, distance: "距袋鼠东门步行5分钟", tags: ["社团聚餐"], category: "东南亚", campus: "袋鼠大学" },
  { id: 28, name: "蜀道难串串", image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600&h=400&fit=crop", rating: 4.5, price: 50, distance: "距袋鼠南门步行7分钟", tags: ["社团聚餐"], category: "火锅", campus: "袋鼠大学" },
  { id: 29, name: "一只酸奶牛", image: "https://images.unsplash.com/photo-1488900128323-21503983a07e?w=600&h=400&fit=crop", rating: 4.3, price: 14, distance: "距袋鼠二教步行3分钟", tags: ["出餐快", "一人食", "吃土专区"], category: "饮品", campus: "袋鼠大学" },
  { id: 30, name: "鸡公煲食堂", image: "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=600&h=400&fit=crop", rating: 4.4, price: 18, distance: "距袋鼠三教步行2分钟", tags: ["出餐快", "一人食", "吃土专区"], category: "简餐", campus: "袋鼠大学" },
  { id: 31, name: "静读茶室", image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&h=400&fit=crop", rating: 4.7, price: 25, distance: "距袋鼠图书馆步行3分钟", tags: ["有插座", "期末自习", "一人食"], category: "茶饮", campus: "袋鼠大学" },
  { id: 32, name: "湘菜馆子", image: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=600&h=400&fit=crop", rating: 4.5, price: 38, distance: "距袋鼠北门步行6分钟", tags: ["社团聚餐", "出餐快"], category: "中餐", campus: "袋鼠大学" },
  { id: 33, name: "手抓饼小站", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop", rating: 4.1, price: 8, distance: "距袋鼠一教步行1分钟", tags: ["出餐快", "一人食", "吃土专区"], category: "简餐", campus: "袋鼠大学" },
  { id: 34, name: "袋鼠意面工坊", image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=600&h=400&fit=crop", rating: 4.6, price: 32, distance: "距袋鼠行政楼步行4分钟", tags: ["社团聚餐", "期末自习"], category: "西餐", campus: "袋鼠大学" },
  { id: 35, name: "小象一食堂", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop", rating: 4.1, price: 10, distance: "距小象宿舍楼步行1分钟", tags: ["出餐快", "一人食", "吃土专区"], category: "简餐", campus: "小象大学" },
  { id: 36, name: "小象旋转小火锅", image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=600&h=400&fit=crop", rating: 4.5, price: 45, distance: "距小象南门步行5分钟", tags: ["社团聚餐", "一人食"], category: "火锅", campus: "小象大学" },
  { id: 37, name: "墨香书吧", image: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=600&h=400&fit=crop", rating: 4.8, price: 28, distance: "距小象图书馆步行2分钟", tags: ["有插座", "期末自习", "一人食"], category: "咖啡", campus: "小象大学" },
  { id: 38, name: "沙县小吃旗舰店", image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&h=400&fit=crop", rating: 4.0, price: 12, distance: "距小象二教步行2分钟", tags: ["出餐快", "一人食", "吃土专区"], category: "简餐", campus: "小象大学" },
  { id: 39, name: "小象披萨屋", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&h=400&fit=crop", rating: 4.6, price: 42, distance: "距小象北门步行6分钟", tags: ["社团聚餐"], category: "西餐", campus: "小象大学" },
  { id: 40, name: "觅茶小筑", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&h=400&fit=crop", rating: 4.7, price: 22, distance: "距小象行政楼步行3分钟", tags: ["有插座", "期末自习"], category: "茶饮", campus: "小象大学" },
  { id: 41, name: "杨国福麻辣烫", image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&h=400&fit=crop", rating: 4.3, price: 16, distance: "距小象三教步行3分钟", tags: ["出餐快", "一人食", "吃土专区"], category: "简餐", campus: "小象大学" },
  { id: 42, name: "小象烤鱼", image: "https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?w=600&h=400&fit=crop", rating: 4.5, price: 55, distance: "距小象东门步行8分钟", tags: ["社团聚餐"], category: "烧烤", campus: "小象大学" },
  { id: 43, name: "米线大王", image: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=600&h=400&fit=crop", rating: 4.2, price: 13, distance: "距小象一教步行2分钟", tags: ["出餐快", "一人食", "吃土专区"], category: "简餐", campus: "小象大学" },
  { id: 44, name: "象牙塔自习室", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop", rating: 4.9, price: 20, distance: "距小象图书馆步行1分钟", tags: ["有插座", "期末自习", "一人食"], category: "咖啡", campus: "小象大学" },
  { id: 45, name: "小象炸鸡", image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=600&h=400&fit=crop", rating: 4.4, price: 20, distance: "距小象体育馆步行3分钟", tags: ["出餐快", "一人食", "社团聚餐"], category: "简餐", campus: "小象大学" },

  // ── 补充：小美大学 (+6) ──
  { id: 46, name: "小美沙拉工坊", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop", rating: 4.5, price: 26, distance: "距小美行政楼步行3分钟", tags: ["期末自习", "一人食"], category: "轻食", campus: "小美大学" },
  { id: 47, name: "匠心寿司", image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=600&h=400&fit=crop", rating: 4.7, price: 52, distance: "距小美西门步行7分钟", tags: ["社团聚餐"], category: "日料", campus: "小美大学" },
  { id: 48, name: "甜蜜时光", image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&h=400&fit=crop", rating: 4.6, price: 24, distance: "距小美宿舍楼步行3分钟", tags: ["一人食", "出餐快"], category: "甜品", campus: "小美大学" },
  { id: 49, name: "果茶研究室", image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&h=400&fit=crop", rating: 4.4, price: 15, distance: "距小美二教步行2分钟", tags: ["出餐快", "一人食"], category: "饮品", campus: "小美大学" },
  { id: 50, name: "小美麻辣火锅", image: "https://images.unsplash.com/photo-1617196035154-1e7e6e28b0db?w=600&h=400&fit=crop", rating: 4.6, price: 58, distance: "距小美南门步行5分钟", tags: ["社团聚餐"], category: "火锅", campus: "小美大学" },
  { id: 51, name: "暹罗小厨", image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=600&h=400&fit=crop", rating: 4.5, price: 38, distance: "距小美北门步行6分钟", tags: ["社团聚餐", "一人食"], category: "东南亚", campus: "小美大学" },

  // ── 补充：团团大学 (+6) ──
  { id: 52, name: "元气轻食屋", image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=400&fit=crop", rating: 4.4, price: 24, distance: "距团团图书馆步行3分钟", tags: ["期末自习", "一人食"], category: "轻食", campus: "团团大学" },
  { id: 53, name: "岚山茶舍", image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=600&h=400&fit=crop", rating: 4.7, price: 22, distance: "距团团图书馆步行4分钟", tags: ["有插座", "期末自习"], category: "茶饮", campus: "团团大学" },
  { id: 54, name: "曼谷九号", image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=600&h=400&fit=crop", rating: 4.6, price: 42, distance: "距团团东门步行6分钟", tags: ["社团聚餐"], category: "东南亚", campus: "团团大学" },
  { id: 55, name: "牛排家", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=400&fit=crop", rating: 4.8, price: 75, distance: "距团团西门步行8分钟", tags: ["社团聚餐"], category: "西餐", campus: "团团大学" },
  { id: 56, name: "果然好喝", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&h=400&fit=crop", rating: 4.3, price: 14, distance: "距团团一教步行2分钟", tags: ["出餐快", "一人食", "吃土专区"], category: "饮品", campus: "团团大学" },
  { id: 57, name: "团团涮锅王", image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=600&h=400&fit=crop", rating: 4.5, price: 52, distance: "距团团北门步行6分钟", tags: ["社团聚餐"], category: "火锅", campus: "团团大学" },

  // ── 补充：袋鼠大学 (+6) ──
  { id: 58, name: "和风物语", image: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=600&h=400&fit=crop", rating: 4.6, price: 48, distance: "距袋鼠北门步行5分钟", tags: ["社团聚餐", "一人食"], category: "日料", campus: "袋鼠大学" },
  { id: 59, name: "甜心工坊", image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&h=400&fit=crop", rating: 4.5, price: 22, distance: "距袋鼠宿舍楼步行2分钟", tags: ["一人食", "出餐快"], category: "甜品", campus: "袋鼠大学" },
  { id: 60, name: "炭火精灵", image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=600&h=400&fit=crop", rating: 4.4, price: 52, distance: "距袋鼠南门步行7分钟", tags: ["社团聚餐"], category: "烧烤", campus: "袋鼠大学" },
  { id: 61, name: "袋鼠牛肉火锅", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop", rating: 4.7, price: 62, distance: "距袋鼠东门步行8分钟", tags: ["社团聚餐"], category: "火锅", campus: "袋鼠大学" },
  { id: 62, name: "外婆家私房菜", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&h=400&fit=crop", rating: 4.5, price: 36, distance: "距袋鼠行政楼步行4分钟", tags: ["社团聚餐", "出餐快"], category: "中餐", campus: "袋鼠大学" },
  { id: 63, name: "清风轻食", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&h=400&fit=crop", rating: 4.3, price: 26, distance: "距袋鼠图书馆步行2分钟", tags: ["期末自习", "一人食"], category: "轻食", campus: "袋鼠大学" },

  // ── 补充：小象大学 (+6) ──
  { id: 64, name: "小象日式拉面", image: "https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=600&h=400&fit=crop", rating: 4.5, price: 35, distance: "距小象东门步行5分钟", tags: ["一人食", "出餐快"], category: "日料", campus: "小象大学" },
  { id: 65, name: "芒果探戈", image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=600&h=400&fit=crop", rating: 4.6, price: 26, distance: "距小象宿舍楼步行3分钟", tags: ["一人食", "出餐快"], category: "甜品", campus: "小象大学" },
  { id: 66, name: "越南粉屋", image: "https://images.unsplash.com/photo-1503764654157-72d979d9af2f?w=600&h=400&fit=crop", rating: 4.4, price: 28, distance: "距小象南门步行4分钟", tags: ["一人食", "出餐快"], category: "东南亚", campus: "小象大学" },
  { id: 67, name: "山茶花茶馆", image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=600&h=400&fit=crop", rating: 4.8, price: 20, distance: "距小象图书馆步行2分钟", tags: ["有插座", "期末自习", "一人食"], category: "茶饮", campus: "小象大学" },
  { id: 68, name: "小象牛排杯", image: "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=600&h=400&fit=crop", rating: 4.5, price: 35, distance: "距小象北门步行5分钟", tags: ["出餐快", "一人食"], category: "西餐", campus: "小象大学" },
  { id: 69, name: "椰风东南亚", image: "https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=600&h=400&fit=crop", rating: 4.3, price: 32, distance: "距小象体育馆步行4分钟", tags: ["社团聚餐", "出餐快"], category: "东南亚", campus: "小象大学" },
];

/* ───────────────────────── Mock Comments ───────────────────────── */

const avatarColors = ["#f97316", "#8b5cf6", "#06b6d4", "#ec4899", "#10b981", "#f59e0b", "#6366f1", "#ef4444"];

const mockCommentPool: Omit<Comment, "id" | "restaurantId">[] = [
  { author: "吃货小陈", avatar: avatarColors[0], rating: 5, content: "绝了！！牛肉给的超多，汤底浓郁，每次路过都忍不住进去。强烈推荐红烧的，比清汤的好吃", time: "3天前", likes: 24 },
  { author: "图书馆钉子户", avatar: avatarColors[1], rating: 4, content: "环境不错，有wifi有插座，适合泡一下午。就是咖啡一般般，胜在安静", time: "1周前", likes: 18 },
  { author: "省钱达人lili", avatar: avatarColors[2], rating: 4, content: "性价比很高了，月底吃土的时候全靠这家续命，分量也还行", time: "5天前", likes: 31 },
  { author: "干饭王阿伟", avatar: avatarColors[3], rating: 5, content: "来这学校三年了，这家是我的食堂top1，没有之一。阿姨打菜手也不抖", time: "2天前", likes: 42 },
  { author: "挑食的喵", avatar: avatarColors[4], rating: 3, content: "味道还行吧，中规中矩。上次去蘑菇没洗干净，扣一星。不过出餐确实快", time: "1周前", likes: 7 },
  { author: "社恐星人", avatar: avatarColors[5], rating: 5, content: "一个人去完全不尴尬！座位之间有隔板，简直是社恐天堂", time: "4天前", likes: 56 },
  { author: "美食博主cc", avatar: avatarColors[6], rating: 4, content: "拍照很出片，味道也对得起这个价格。就是周末人太多了要排队", time: "3天前", likes: 15 },
  { author: "考研打工人", avatar: avatarColors[7], rating: 5, content: "备考期间天天来，老板都认识我了hh 安利他家的拿铁，提神效果一级棒", time: "昨天", likes: 29 },
  { author: "路过的学姐", avatar: avatarColors[0], rating: 3, content: "emmm 以前更好吃的，最近感觉换厨师了？调料味重了不少", time: "6天前", likes: 11 },
  { author: "体育生小王", avatar: avatarColors[1], rating: 5, content: "练完就来这吃，蛋白质给够了！老板人也nice，有时候会多给点肉", time: "2天前", likes: 37 },
  { author: "选择困难户", avatar: avatarColors[2], rating: 4, content: "菜单选择很多，每次来都纠结半天。推荐套餐B，闭眼点不踩雷", time: "4天前", likes: 20 },
  { author: "夜猫子大鹏", avatar: avatarColors[3], rating: 4, content: "晚上九点多还开着，救了无数次我的命。烧烤味道正宗，就是油烟味会沾衣服", time: "1周前", likes: 16 },
  { author: "减肥中的我", avatar: avatarColors[4], rating: 4, content: "轻食沙拉很新鲜，鸡胸肉不柴。就是...每次路过隔壁的炸鸡店都是考验", time: "3天前", likes: 23 },
  { author: "留学生Marco", avatar: avatarColors[5], rating: 5, content: "The best Chinese food near campus! The mapo tofu reminds me of my host family's cooking. 很好吃!", time: "5天前", likes: 19 },
  { author: "打工兼职人", avatar: avatarColors[6], rating: 3, content: "中午高峰期等了快20分钟…味道4分，效率2分。建议错峰去", time: "2天前", likes: 8 },
  { author: "甜食星球", avatar: avatarColors[7], rating: 5, content: "芋泥奶茶永远的神！！终于有家店把芋泥做得不假滑了。每周至少三杯", time: "昨天", likes: 45 },
  { author: "佛系干饭人", avatar: avatarColors[0], rating: 4, content: "不功不过，稳定输出。饿了就去，从来没失望过，也没有特别惊艳过", time: "1周前", likes: 12 },
  { author: "隔壁寝室老六", avatar: avatarColors[1], rating: 5, content: "谢谢推荐这家！！室友带我来的，现在每天都想吃。钱包在哭泣但嘴巴很开心", time: "3天前", likes: 33 },
  { author: "本地同学小方", avatar: avatarColors[2], rating: 4, content: "作为本地人说一句，这家的口味算是很正宗了。花椒用的是汉源的，老板有追求", time: "6天前", likes: 27 },
  { author: "凌晨四点", avatar: avatarColors[3], rating: 3, content: "上次吃完拉了一天…可能是我自己肠胃不好吧。但说实话味道是真不错", time: "1周前", likes: 5 },
  { author: "大四老狗", avatar: avatarColors[4], rating: 5, content: "快毕业了，最舍不得的就是这家。从大一吃到大四，承载了太多回忆了", time: "昨天", likes: 61 },
  { author: "沉默的食客", avatar: avatarColors[5], rating: 4, content: "份量OK 口味OK 价格OK 就是位置有点偏", time: "4天前", likes: 9 },
  { author: "辣不怕星人", avatar: avatarColors[6], rating: 5, content: "终于！终于有家店的辣是真的辣了！微辣就够普通人喝三瓶水那种，爽！", time: "2天前", likes: 38 },
  { author: "养生少女", avatar: avatarColors[7], rating: 4, content: "粥很暖胃，早上来一碗整个人都活过来了。配的小菜种类再多一点就完美了", time: "5天前", likes: 14 },
  { author: "火锅十级选手", avatar: avatarColors[0], rating: 5, content: "锅底超香！毛肚鲜嫩，鸭血入味，吃了三盘都不够。蘸料台也很丰富，好评", time: "昨天", likes: 47 },
  { author: "嗜辣如命", avatar: avatarColors[1], rating: 4, content: "红锅确实够劲，但清汤锅底有点寡淡。四个人吃人均70左右，学生价还行", time: "3天前", likes: 22 },
  { author: "日料控Yuki", avatar: avatarColors[2], rating: 5, content: "三文鱼刺身很新鲜！！这个价位能吃到这个品质，在学校附近算很难得了", time: "2天前", likes: 35 },
  { author: "减脂打卡人", avatar: avatarColors[3], rating: 4, content: "鸡胸肉沙拉每天必点，热量低饱腹感强。就是酱汁种类能再多点就好了", time: "4天前", likes: 17 },
  { author: "甜品脑袋", avatar: avatarColors[4], rating: 5, content: "提拉米苏是我吃过学校周边最好吃的！奶油不腻，咖啡味刚好。每周犒劳自己一次", time: "昨天", likes: 40 },
  { author: "东南亚胃", avatar: avatarColors[5], rating: 4, content: "冬阴功汤很正宗，有点泰国街头的感觉。椰浆饭也推荐，量大实惠", time: "5天前", likes: 26 },
  { author: "奶茶续命", avatar: avatarColors[6], rating: 5, content: "杨枝甘露绝了，芒果用的是新鲜的不是罐头！大杯喝完超满足", time: "2天前", likes: 52 },
  { author: "独居美食家", avatar: avatarColors[7], rating: 4, content: "一个人来吃完全不尴尬，日式拉面配个溏心蛋，治愈了一整天的疲惫", time: "1周前", likes: 19 },
  { author: "请叫我省钱王", avatar: avatarColors[0], rating: 3, content: "味道可以但分量缩水了…上学期还没这样。希望老板看到能改回来", time: "6天前", likes: 13 },
  { author: "周末探店er", avatar: avatarColors[1], rating: 5, content: "环境超好适合拍照！窗边的位置有自然光，发朋友圈绝了。食物味道也在线", time: "3天前", likes: 31 },
  { author: "深夜胃", avatar: avatarColors[2], rating: 4, content: "大半夜馋了就往这跑，烤串配啤酒太幸福了。就是烟味大，去之前别穿好衣服", time: "4天前", likes: 21 },
];

function getCommentsForRestaurant(id: number): Comment[] {
  const seed = id * 7;
  const count = 3 + (seed % 3);
  const pool = mockCommentPool;
  const result: Comment[] = [];
  const used = new Set<number>();
  for (let i = 0; i < count; i++) {
    let idx = (seed + i * 13 + i * i * 3) % pool.length;
    while (used.has(idx)) idx = (idx + 1) % pool.length;
    used.add(idx);
    result.push({ ...pool[idx], id: `mock-${id}-${i}`, restaurantId: id });
  }
  return result;
}

/* ───────────────────────── Filter Tags ───────────────────────── */

const filterTags = [
  { label: "全部", icon: Sparkles },
  { label: "吃土专区", icon: Zap },
  { label: "社团聚餐", icon: Utensils },
  { label: "期末自习", icon: Clock },
  { label: "一人食", icon: Home },
  { label: "出餐快", icon: Zap },
];

const tagDealMap: Record<string, (r: Restaurant) => string | null> = {
  吃土专区: (r) => {
    const deals = [
      r.price <= 10 && `加1元升级大份`,
      r.price <= 12 && `满${r.price}减${Math.max(2, Math.floor(r.price * 0.2))}`,
      r.price <= 15 && `工作日午市第二份半价`,
      r.price <= 18 && `套餐立减3元`,
      `持学生卡减2元`,
    ];
    return deals[(r.id * 3) % deals.length] || deals[deals.length - 1] || null;
  },
  社团聚餐: (r) => {
    const deals = [
      `6人以上享8.5折`,
      `满4人送一扎饮料`,
      `团购5人套餐省¥${Math.floor(r.price * 0.6)}`,
      `3人拼桌送饮品`,
      `生日当天寿星免单`,
      `大桌预订免包间费`,
    ];
    return deals[(r.id * 7) % deals.length];
  },
  期末自习: (r) => {
    const deals = [
      `消费即享不限时WiFi`,
      `续杯半价`,
      `充电宝免费借`,
      `点饮品送小食`,
      `期末周买一送一`,
      `自习套餐含饮品¥${Math.max(15, r.price - 5)}`,
    ];
    return deals[(r.id * 5) % deals.length];
  },
  一人食: (r) => {
    const deals = [
      `单人套餐含饮料¥${Math.max(10, r.price - 3)}`,
      `加卤蛋只要+1元`,
      `集卡买5送1`,
      `工作日午市专属折扣`,
      `单人堂食免配送费`,
      `每日限定款¥${Math.max(8, r.price - 5)}`,
    ];
    return deals[(r.id * 11) % deals.length];
  },
  出餐快: (r) => {
    const deals = [
      `下单5分钟保证出餐`,
      `课间套餐3分钟出餐`,
      `超时未出餐免单`,
      `午高峰提前下单减¥2`,
      `打包带走立减1元`,
      `闪电出餐 · 均速${2 + (r.id % 4)}分钟`,
    ];
    return deals[(r.id * 9) % deals.length];
  },
};

function getTagDeal(tag: string, restaurant: Restaurant): string | null {
  if (tag === "全部" || !tagDealMap[tag]) return null;
  if (!restaurant.tags.includes(tag)) return null;
  return tagDealMap[tag](restaurant);
}

const categoryFilters = [
  { label: "不限", icon: UtensilsCrossed },
  { label: "简餐", icon: Utensils },
  { label: "中餐", icon: Flame },
  { label: "火锅", icon: Flame },
  { label: "西餐", icon: Pizza },
  { label: "烧烤", icon: Flame },
  { label: "咖啡", icon: Coffee },
  { label: "饮品", icon: CupSoda },
  { label: "甜品", icon: IceCreamCone },
  { label: "轻食", icon: Salad },
  { label: "茶饮", icon: Coffee },
  { label: "日料", icon: Utensils },
  { label: "东南亚", icon: Utensils },
];

/* ──────────────────── Tab Context Banner ──────────────────── */

function TabBanner({
  activeTag,
  restaurants,
}: {
  activeTag: string;
  restaurants: Restaurant[];
}) {
  if (activeTag === "全部") return null;

  const cheapest = restaurants.length
    ? restaurants.reduce((a, b) => (a.price < b.price ? a : b))
    : null;
  const topRated = restaurants.length
    ? restaurants.reduce((a, b) => (a.rating > b.rating ? a : b))
    : null;

  const banners: Record<
    string,
    {
      bg: string;
      border: string;
      icon: React.ReactNode;
      title: string;
      desc: string;
      highlights: { icon: React.ReactNode; text: string }[];
    }
  > = {
    吃土专区: {
      bg: "from-amber-50 to-orange-50",
      border: "border-amber-200/60",
      icon: <BadgePercent className="w-5 h-5 text-amber-500" />,
      title: "月底省钱攻略",
      desc: "精选人均 ¥15 以下好店，让你的钱包和胃都满意",
      highlights: [
        {
          icon: <Ticket className="w-3.5 h-3.5 text-amber-500" />,
          text: cheapest
            ? `最低 ¥${cheapest.price}「${cheapest.name}」`
            : "暂无数据",
        },
        {
          icon: <Crown className="w-3.5 h-3.5 text-amber-500" />,
          text: topRated
            ? `性价比之王「${topRated.name}」${topRated.rating}分`
            : "",
        },
        {
          icon: <Zap className="w-3.5 h-3.5 text-amber-500" />,
          text: `共 ${restaurants.length} 家穷学生友好店`,
        },
      ],
    },
    社团聚餐: {
      bg: "from-violet-50 to-purple-50",
      border: "border-violet-200/60",
      icon: <Users className="w-5 h-5 text-violet-500" />,
      title: "聚餐好去处",
      desc: "适合 4 人以上聚餐，空间大、氛围好、可拼桌",
      highlights: [
        {
          icon: <Users className="w-3.5 h-3.5 text-violet-500" />,
          text: `${restaurants.length} 家支持多人聚餐`,
        },
        {
          icon: <Crown className="w-3.5 h-3.5 text-violet-500" />,
          text: topRated
            ? `人气最旺「${topRated.name}」${topRated.rating}分`
            : "",
        },
        {
          icon: <Ticket className="w-3.5 h-3.5 text-violet-500" />,
          text: "部分店家 6 人以上享 8.5 折",
        },
      ],
    },
    期末自习: {
      bg: "from-sky-50 to-cyan-50",
      border: "border-sky-200/60",
      icon: <BookOpen className="w-5 h-5 text-sky-500" />,
      title: "学习续命站",
      desc: "有 WiFi、有插座、安静不赶人，备考人的第二自习室",
      highlights: [
        {
          icon: <Wifi className="w-3.5 h-3.5 text-sky-500" />,
          text: `${restaurants.length} 家提供免费 WiFi`,
        },
        {
          icon: <Volume2 className="w-3.5 h-3.5 text-sky-500" />,
          text: "环境安静，适合长时间停留",
        },
        {
          icon: <Coffee className="w-3.5 h-3.5 text-sky-500" />,
          text: topRated
            ? `学霸最爱「${topRated.name}」`
            : "",
        },
      ],
    },
    一人食: {
      bg: "from-pink-50 to-rose-50",
      border: "border-pink-200/60",
      icon: <Heart className="w-5 h-5 text-pink-500" />,
      title: "一个人也要好好吃饭",
      desc: "不尴尬、有隔板、不用拼桌，享受独处的美食时光",
      highlights: [
        {
          icon: <Armchair className="w-3.5 h-3.5 text-pink-500" />,
          text: `${restaurants.length} 家单人友好餐厅`,
        },
        {
          icon: <Heart className="w-3.5 h-3.5 text-pink-500" />,
          text: topRated
            ? `独食首选「${topRated.name}」${topRated.rating}分`
            : "",
        },
        {
          icon: <Ticket className="w-3.5 h-3.5 text-pink-500" />,
          text: cheapest
            ? `最低只要 ¥${cheapest.price}`
            : "",
        },
      ],
    },
    出餐快: {
      bg: "from-emerald-50 to-teal-50",
      border: "border-emerald-200/60",
      icon: <Timer className="w-5 h-5 text-emerald-500" />,
      title: "课间 10 分钟极速出餐",
      desc: "赶时间？这些店 5 分钟内出餐，下课冲刺不迟到",
      highlights: [
        {
          icon: <Timer className="w-3.5 h-3.5 text-emerald-500" />,
          text: `${restaurants.length} 家闪电出餐`,
        },
        {
          icon: <Zap className="w-3.5 h-3.5 text-emerald-500" />,
          text: topRated
            ? `最快最好吃「${topRated.name}」`
            : "",
        },
        {
          icon: <MapPin className="w-3.5 h-3.5 text-emerald-500" />,
          text: "大部分距教学楼步行 3 分钟内",
        },
      ],
    },
  };

  const banner = banners[activeTag];
  if (!banner) return null;

  return (
    <motion.div
      key={activeTag}
      initial={{ opacity: 0, y: -10, height: 0 }}
      animate={{ opacity: 1, y: 0, height: "auto" }}
      exit={{ opacity: 0, y: -10, height: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="mb-4 overflow-hidden"
    >
      <div
        className={`bg-gradient-to-r ${banner.bg} rounded-2xl border ${banner.border} p-4`}
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/80 flex items-center justify-center flex-shrink-0 shadow-sm">
            {banner.icon}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-slate-700 mb-0.5">
              {banner.title}
            </h3>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              {banner.desc}
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1.5">
              {banner.highlights
                .filter((h) => h.text)
                .map((h, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    {h.icon}
                    <span className="text-[11px] text-slate-500 font-medium">
                      {h.text}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ──────────────────── Star Rating Input ──────────────────── */

function StarRating({
  value,
  onChange,
  readonly = false,
  size = "sm",
}: {
  value: number;
  onChange?: (v: number) => void;
  readonly?: boolean;
  size?: "sm" | "md";
}) {
  const s = size === "md" ? "w-5 h-5" : "w-3.5 h-3.5";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          disabled={readonly}
          onClick={() => onChange?.(i)}
          className={readonly ? "cursor-default" : "cursor-pointer hover:scale-110 transition-transform"}
        >
          <Star
            className={`${s} ${
              i <= value
                ? "text-amber-400 fill-amber-400"
                : "text-slate-200"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

/* ──────────────────── Restaurant Detail Modal ──────────────────── */

function DetailModal({
  restaurant,
  onClose,
  comments,
  onAddComment,
}: {
  restaurant: Restaurant;
  onClose: () => void;
  comments: Comment[];
  onAddComment: (c: Omit<Comment, "id">) => void;
}) {
  const currentUser = { name: "蒋凌雨", color: "#6366f1" };
  const [newRating, setNewRating] = useState(5);
  const [newText, setNewText] = useState("");
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSubmit = () => {
    if (!newText.trim()) return;
    onAddComment({
      restaurantId: restaurant.id,
      author: currentUser.name,
      avatar: currentUser.color,
      rating: newRating,
      content: newText.trim(),
      time: "刚刚",
      likes: 0,
    });
    setNewText("");
    setNewRating(5);
    setTimeout(() => scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" }), 100);
  };

  const toggleLike = (id: string) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const campus = campuses.find((c) => c.name === restaurant.campus);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      <motion.div
        initial={{ y: "100%", opacity: 0.5 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="relative bg-white w-full max-w-lg md:rounded-3xl rounded-t-3xl shadow-2xl max-h-[92vh] flex flex-col overflow-hidden"
      >
        {/* Hero Image */}
        <div className="relative h-56 md:h-64 flex-shrink-0">
          <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          <button
            onClick={onClose}
            className="absolute top-4 left-4 w-9 h-9 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center hover:bg-black/50 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>

          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md rounded-xl px-3 py-1.5 flex items-center gap-1 shadow-sm">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="text-sm font-bold text-slate-800">{restaurant.rating}</span>
          </div>

          <div className="absolute bottom-4 left-5 right-5">
            <h2 className="text-white text-2xl font-bold mb-1">{restaurant.name}</h2>
            <div className="flex items-center gap-3 text-white/80 text-sm">
              <span className="font-semibold text-orange-300">¥{restaurant.price}/人</span>
              <span>·</span>
              <span>{restaurant.category}</span>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto hide-scrollbar">
          {/* Info Section */}
          <div className="px-5 pt-5 pb-4">
            <div className="flex items-center gap-2 text-slate-500 text-sm mb-3">
              <MapPin className="w-4 h-4 text-slate-400" />
              <span>{restaurant.distance}</span>
            </div>

            <div className="flex items-center gap-2 text-sm mb-4">
              <Building2 className="w-4 h-4" style={{ color: campus?.color }} />
              <span className="font-medium" style={{ color: campus?.color }}>{restaurant.campus}</span>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-5">
              {restaurant.tags.map((tag) => (
                <span key={tag} className="text-xs px-3 py-1 rounded-full bg-orange-50 text-orange-600 border border-orange-100 font-medium">
                  {tag}
                </span>
              ))}
            </div>

            <div className="h-px bg-slate-100" />
          </div>

          {/* Comments Section */}
          <div className="px-5 pb-4">
            <div className="flex items-center gap-2 mb-4">
              <MessageCircle className="w-4 h-4 text-slate-500" />
              <h3 className="font-semibold text-slate-700 text-sm">
                同学评价
              </h3>
              <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                {comments.length}
              </span>
            </div>

            {comments.length === 0 ? (
              <div className="py-8 text-center">
                <MessageCircle className="w-10 h-10 text-slate-200 mx-auto mb-2" />
                <p className="text-sm text-slate-400">还没有评价，来做第一个评价的人吧！</p>
              </div>
            ) : (
              <div className="space-y-4">
                {comments.map((c, i) => (
                  <motion.div
                    key={c.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="group/comment"
                  >
                    <div className="flex gap-3">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                        style={{ backgroundColor: c.avatar }}
                      >
                        {c.author[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-slate-700">{c.author}</span>
                          <span className="text-[11px] text-slate-400">{c.time}</span>
                        </div>
                        <StarRating value={c.rating} readonly size="sm" />
                        <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">{c.content}</p>
                        <button
                          onClick={() => toggleLike(c.id)}
                          className={`flex items-center gap-1 mt-2 text-xs transition-colors ${
                            likedIds.has(c.id)
                              ? "text-orange-500"
                              : "text-slate-400 hover:text-slate-600"
                          }`}
                        >
                          <ThumbsUp className={`w-3 h-3 ${likedIds.has(c.id) ? "fill-orange-500" : ""}`} />
                          <span>{c.likes + (likedIds.has(c.id) ? 1 : 0)}</span>
                        </button>
                      </div>
                    </div>
                    {i < comments.length - 1 && <div className="h-px bg-slate-50 mt-4" />}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Comment Input */}
        <div className="flex-shrink-0 border-t border-slate-100 bg-white px-5 py-4 pb-[env(safe-area-inset-bottom)]">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
              style={{ backgroundColor: currentUser.color }}
            >
              {currentUser.name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium text-slate-700">{currentUser.name}</span>
                <StarRating value={newRating} onChange={setNewRating} size="sm" />
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="说说你的真实体验..."
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  className="flex-1 text-sm px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-100 text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-200"
                />
                <button
                  onClick={handleSubmit}
                  disabled={!newText.trim()}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:from-orange-600 hover:to-orange-700 transition-all active:scale-95 flex items-center gap-1.5"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ──────────────────── Restaurant Card ──────────────────── */

const tagDealStyles: Record<string, { bg: string; text: string; border: string; icon: string }> = {
  吃土专区: { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-200", icon: "🏷️" },
  社团聚餐: { bg: "bg-violet-50", text: "text-violet-600", border: "border-violet-200", icon: "🎉" },
  期末自习: { bg: "bg-sky-50", text: "text-sky-600", border: "border-sky-200", icon: "📚" },
  一人食: { bg: "bg-pink-50", text: "text-pink-600", border: "border-pink-200", icon: "💝" },
  出餐快: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-200", icon: "⚡" },
};

function RestaurantCard({
  restaurant,
  onClick,
  activeTag = "全部",
}: {
  restaurant: Restaurant;
  onClick: () => void;
  activeTag?: string;
}) {
  const deal = getTagDeal(activeTag, restaurant);
  const dealStyle = deal ? tagDealStyles[activeTag] : null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-slate-100">
        <div className="relative h-44 md:h-48 overflow-hidden">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md rounded-xl px-2.5 py-1 flex items-center gap-1 shadow-sm">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="text-sm font-semibold text-slate-800">
              {restaurant.rating}
            </span>
          </div>
          {deal && dealStyle && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute top-3 left-0"
            >
              <div className={`${dealStyle.bg} ${dealStyle.text} ${dealStyle.border} border-r border-y pl-2.5 pr-3 py-1 rounded-r-full text-[11px] font-bold shadow-sm backdrop-blur-sm flex items-center gap-1`}>
                <span>{dealStyle.icon}</span>
                <span>{deal}</span>
              </div>
            </motion.div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-slate-800 text-base leading-tight">
              {restaurant.name}
            </h3>
            <span className="text-orange-500 font-bold text-sm whitespace-nowrap ml-2">
              ¥{restaurant.price}/人
            </span>
          </div>
          <div className="flex items-center gap-1 text-slate-400 text-xs mb-3">
            <MapPin className="w-3 h-3" />
            <span>{restaurant.distance}</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {restaurant.tags.map((tag) => (
              <span
                key={tag}
                className={`text-[11px] px-2 py-0.5 rounded-full border ${
                  tag === activeTag && activeTag !== "全部"
                    ? `${dealStyle?.bg || "bg-orange-50"} ${dealStyle?.text || "text-orange-500"} ${dealStyle?.border || "border-orange-200"} font-semibold`
                    : "bg-slate-50 text-slate-500 border-slate-100"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ──────────────── Slot Machine / Random Modal ──────────────── */

function RandomModal({
  isOpen,
  onClose,
  onViewDetail,
}: {
  isOpen: boolean;
  onClose: () => void;
  onViewDetail: (r: Restaurant) => void;
}) {
  const [phase, setPhase] = useState<"spinning" | "result">("spinning");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [result, setResult] = useState<Restaurant | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    setPhase("spinning");
    setResult(null);

    const finalIndex = Math.floor(Math.random() * mockRestaurants.length);
    let speed = 50;
    let elapsed = 0;
    let idx = 0;

    const tick = () => {
      idx = (idx + 1) % mockRestaurants.length;
      setCurrentIndex(idx);
      elapsed += speed;
      if (elapsed > 2500) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setCurrentIndex(finalIndex);
        setResult(mockRestaurants[finalIndex]);
        setPhase("result");
        return;
      }
      if (elapsed > 1800) speed = 200;
      else if (elapsed > 1200) speed = 120;
      else if (elapsed > 600) speed = 80;
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(tick, speed);
    };
    intervalRef.current = setInterval(tick, speed);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden"
          >
            <button onClick={onClose} className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors">
              <X className="w-4 h-4 text-slate-500" />
            </button>
            {phase === "spinning" ? (
              <div className="p-8 text-center">
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                  <Shuffle className="w-8 h-8 text-white" />
                </motion.div>
                <p className="text-sm text-slate-400 mb-4">命运的齿轮开始转动...</p>
                <motion.div key={currentIndex} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-2xl font-bold text-slate-800">
                  {mockRestaurants[currentIndex].name}
                </motion.div>
              </div>
            ) : result ? (
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img src={result.image} alt={result.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="absolute bottom-4 left-4 right-4">
                    <p className="text-white/80 text-sm mb-1">今天就吃这家！</p>
                    <h3 className="text-white text-2xl font-bold">{result.name}</h3>
                  </motion.div>
                </div>
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.35 }} className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span className="font-semibold text-slate-700">{result.rating}</span>
                    </div>
                    <span className="text-orange-500 font-bold">¥{result.price}/人</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400 text-sm mb-4">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{result.distance}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {result.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-orange-50 text-orange-600 border border-orange-100">{tag}</span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => { onClose(); onViewDetail(result); }}
                      className="flex-1 py-3 rounded-2xl border border-orange-200 text-orange-500 font-semibold text-sm hover:bg-orange-50 transition-all active:scale-[0.98]"
                    >
                      查看详情
                    </button>
                    <button onClick={onClose} className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold text-sm hover:from-orange-600 hover:to-orange-700 transition-all active:scale-[0.98]">
                      就这么定了！
                    </button>
                  </div>
                </motion.div>
              </div>
            ) : null}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ──────────────────── Campus Map ──────────────────── */

function CampusMap({ selectedCampus, onSelectCampus }: { selectedCampus: string | null; onSelectCampus: (name: string | null) => void }) {
  const restaurantCountByCampus = (name: string) => mockRestaurants.filter((r) => r.campus === name).length;

  return (
    <div className="bg-emerald-50/60 rounded-3xl border border-emerald-100 p-5 relative overflow-hidden">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <Map className="w-5 h-5 text-emerald-600" />
          <h3 className="font-semibold text-emerald-800 text-sm">校园地图</h3>
        </div>
        {selectedCampus && (
          <button onClick={() => onSelectCampus(null)} className="text-xs text-emerald-500 hover:text-emerald-700 flex items-center gap-0.5 transition-colors">
            <X className="w-3 h-3" />清除筛选
          </button>
        )}
      </div>
      <p className="text-xs text-emerald-500 mb-3">点击学校图钉查看附近餐厅</p>
      <div className="relative w-full" style={{ paddingBottom: "65%" }}>
        <div className="absolute inset-0 opacity-15">
          {[...Array(6)].map((_, i) => (<div key={`h-${i}`} className="absolute w-full border-t border-emerald-400" style={{ top: `${(i + 1) * 16.6}%` }} />))}
          {[...Array(6)].map((_, i) => (<div key={`v-${i}`} className="absolute h-full border-l border-emerald-400" style={{ left: `${(i + 1) * 16.6}%` }} />))}
        </div>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 65" preserveAspectRatio="none">
          <path d="M 18 22 Q 45 10 72 18" fill="none" stroke="rgb(167 243 208)" strokeWidth="1" strokeDasharray="3 2" />
          <path d="M 25 68 Q 48 45 75 65" fill="none" stroke="rgb(167 243 208)" strokeWidth="1" strokeDasharray="3 2" />
          <path d="M 18 22 Q 20 45 25 68" fill="none" stroke="rgb(167 243 208)" strokeWidth="1" strokeDasharray="3 2" />
          <path d="M 72 18 Q 74 40 75 65" fill="none" stroke="rgb(167 243 208)" strokeWidth="1" strokeDasharray="3 2" />
          <path d="M 45 10 Q 48 35 48 60" fill="none" stroke="rgb(167 243 208)" strokeWidth="0.8" strokeDasharray="2 2" />
        </svg>
        {campuses.map((campus) => {
          const isActive = selectedCampus === campus.name;
          const count = restaurantCountByCampus(campus.name);
          return (
            <motion.div key={campus.name} initial={{ scale: 0, y: -10 }} animate={{ scale: 1, y: 0 }} transition={{ delay: 0.15, type: "spring", stiffness: 350 }} className="absolute z-10 flex flex-col items-center" style={{ left: `${campus.x}%`, top: `${campus.y}%`, transform: "translate(-50%, -100%)" }}>
              <button onClick={() => onSelectCampus(isActive ? null : campus.name)} className="flex flex-col items-center group/pin">
                <motion.div initial={false} animate={{ scale: isActive ? 1 : 0.85, opacity: isActive ? 1 : 0.8 }} className={`rounded-xl px-2 py-1 mb-1 text-center whitespace-nowrap transition-all border ${isActive ? "bg-white shadow-lg border-slate-200 scale-105" : "bg-white/80 backdrop-blur-sm border-transparent group-hover/pin:bg-white group-hover/pin:shadow-md group-hover/pin:border-slate-200"}`}>
                  <p className="text-[10px] font-bold leading-tight" style={{ color: campus.color }}>{campus.name}</p>
                  <p className="text-[9px] text-slate-400 leading-tight">{count} 家餐厅</p>
                </motion.div>
                <motion.div animate={isActive ? { scale: [1, 1.3, 1] } : {}} transition={{ duration: 0.4 }}>
                  <MapPin className="w-6 h-6 drop-shadow-md transition-transform group-hover/pin:scale-110" style={{ color: campus.color, fill: campus.color }} />
                </motion.div>
                {isActive && (
                  <motion.div initial={{ scale: 0.5, opacity: 0.8 }} animate={{ scale: 2.5, opacity: 0 }} transition={{ repeat: Infinity, duration: 1.5 }} className="absolute bottom-0 w-3 h-3 rounded-full" style={{ backgroundColor: campus.color }} />
                )}
              </button>
            </motion.div>
          );
        })}
      </div>
      <div className="flex gap-1.5 mt-3 flex-wrap">
        {campuses.map((c) => {
          const isActive = selectedCampus === c.name;
          return (
            <button key={c.name} onClick={() => onSelectCampus(isActive ? null : c.name)} className={`text-[11px] px-2.5 py-1 rounded-full font-medium transition-all ${isActive ? "text-white shadow-sm" : "bg-white/80 text-slate-500 border border-slate-200 hover:border-slate-300"}`} style={isActive ? { backgroundColor: c.color } : undefined}>
              {c.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ──── Campus Nearby Panel ──── */

function CampusNearbyPanel({
  campusName,
  onClose,
  onSelectRestaurant,
}: {
  campusName: string;
  onClose: () => void;
  onSelectRestaurant: (r: Restaurant) => void;
}) {
  const nearby = mockRestaurants.filter((r) => r.campus === campusName);
  const campus = campuses.find((c) => c.name === campusName);

  return (
    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} className="overflow-hidden">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 mt-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: campus?.color }} />
            <h4 className="text-sm font-semibold text-slate-700">{campusName}附近</h4>
            <span className="text-[11px] text-slate-400">{nearby.length} 家</span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors"><X className="w-4 h-4" /></button>
        </div>
        <div className="space-y-2 max-h-[280px] overflow-y-auto hide-scrollbar">
          {nearby.map((r, i) => (
            <motion.div key={r.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }} onClick={() => onSelectRestaurant(r)} className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group">
              <img src={r.image} alt={r.name} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-700 truncate">{r.name}</p>
                  <div className="flex items-center gap-0.5 ml-2 flex-shrink-0">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span className="text-xs text-slate-600">{r.rating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[11px] text-orange-500 font-medium">¥{r.price}/人</span>
                  <span className="text-[10px] text-slate-400 truncate">{r.distance}</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ──────────────────── Main Page ──────────────────── */

export default function BiteCampusPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState("全部");
  const [activeCategory, setActiveCategory] = useState("不限");
  const [showRandomModal, setShowRandomModal] = useState(false);
  const [selectedCampus, setSelectedCampus] = useState<string | null>(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [userComments, setUserComments] = useState<Comment[]>([]);
  const [mobileView, setMobileView] = useState<"home" | "map" | "decide">("home");

  const getComments = (restaurantId: number) => [
    ...getCommentsForRestaurant(restaurantId),
    ...userComments.filter((c) => c.restaurantId === restaurantId),
  ];

  const handleAddComment = (comment: Omit<Comment, "id">) => {
    setUserComments((prev) => [...prev, { ...comment, id: `user-${Date.now()}` }]);
  };

  const filteredRestaurants = mockRestaurants.filter((r) => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || r.name.toLowerCase().includes(query) || r.tags.some((t) => t.toLowerCase().includes(query)) || r.category.toLowerCase().includes(query) || r.price.toString().includes(query) || r.distance.includes(query);
    const matchesTag = activeTag === "全部" || r.tags.some((t) => t.includes(activeTag));
    const matchesCategory = activeCategory === "不限" || r.category === activeCategory;
    const matchesCampus = !selectedCampus || r.campus === selectedCampus;
    return matchesSearch && matchesTag && matchesCategory && matchesCampus;
  });

  return (
    <div className="min-h-screen bg-slate-50 pb-20 md:pb-8">
      <header className="pt-6 pb-2 px-5 md:px-10 lg:px-16">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-md shadow-orange-200">
            <Utensils className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">BiteCampus</h1>
            <p className="text-xs text-slate-400">校园干饭指南</p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-xs font-medium text-slate-500">蒋凌雨</p>
            <p className="text-[11px] text-slate-400">15003358938</p>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileView === "map" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="md:hidden px-5 mb-4 space-y-4">
            <CampusMap selectedCampus={selectedCampus} onSelectCampus={setSelectedCampus} />
            <AnimatePresence>
              {selectedCampus && <CampusNearbyPanel key={selectedCampus} campusName={selectedCampus} onClose={() => setSelectedCampus(null)} onSelectRestaurant={setSelectedRestaurant} />}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`md:grid md:grid-cols-5 md:gap-6 md:px-10 lg:px-16 px-5 ${mobileView === "map" ? "hidden md:grid" : ""}`}>
        <div className="md:col-span-3">
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
            <input type="text" placeholder="搜搜看... 餐厅名、菜系、价格" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3.5 bg-white rounded-2xl border border-slate-100 shadow-sm text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-300 transition-all" />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200">
                <X className="w-3 h-3 text-slate-400" />
              </button>
            )}
          </div>

          <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-3">
            {filterTags.map((tag) => {
              const isActive = activeTag === tag.label;
              const Icon = tag.icon;
              const count = tag.label === "全部"
                ? mockRestaurants.length
                : mockRestaurants.filter((r) => r.tags.includes(tag.label)).length;
              return (
                <button key={tag.label} onClick={() => setActiveTag(tag.label)} className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all active:scale-95 ${isActive ? "bg-orange-500 text-white shadow-md shadow-orange-200" : "bg-white text-slate-500 border border-slate-100 hover:border-orange-200 hover:text-orange-500"}`}>
                  <Icon className="w-3.5 h-3.5" />
                  {tag.label}
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full leading-none ${isActive ? "bg-white/25 text-white" : "bg-slate-100 text-slate-400"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex gap-1.5 overflow-x-auto hide-scrollbar pb-4">
            {categoryFilters.map((cat) => {
              const isActive = activeCategory === cat.label;
              const Icon = cat.icon;
              return (
                <button key={cat.label} onClick={() => setActiveCategory(cat.label)} className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all active:scale-95 ${isActive ? "bg-emerald-500 text-white shadow-sm shadow-emerald-200" : "bg-slate-50 text-slate-400 border border-slate-100 hover:border-emerald-200 hover:text-emerald-500"}`}>
                  <Icon className="w-3 h-3" />{cat.label}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <TabBanner activeTag={activeTag} restaurants={filteredRestaurants} />
          </AnimatePresence>

          <AnimatePresence>
            {selectedCampus && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-full border border-slate-200 shadow-sm text-sm">
                  <MapPin className="w-3.5 h-3.5" style={{ color: campuses.find((c) => c.name === selectedCampus)?.color }} />
                  <span className="text-slate-600 text-xs font-medium">{selectedCampus}附近</span>
                  <button onClick={() => setSelectedCampus(null)} className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200">
                    <X className="w-2.5 h-2.5 text-slate-400" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <LayoutGroup>
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AnimatePresence mode="popLayout">
                {filteredRestaurants.length > 0 ? (
                  filteredRestaurants.map((r) => (
                    <RestaurantCard key={r.id} restaurant={r} onClick={() => setSelectedRestaurant(r)} activeTag={activeTag} />
                  ))
                ) : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full py-20 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center"><Search className="w-7 h-7 text-slate-300" /></div>
                    <p className="text-slate-400 text-sm">没有找到匹配的餐厅，换个关键词试试？</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>
        </div>

        <div className="hidden md:block md:col-span-2">
          <div className="sticky top-6 space-y-5">
            <CampusMap selectedCampus={selectedCampus} onSelectCampus={setSelectedCampus} />
            <AnimatePresence>
              {selectedCampus && (
                <CampusNearbyPanel key={selectedCampus} campusName={selectedCampus} onClose={() => setSelectedCampus(null)} onSelectRestaurant={setSelectedRestaurant} />
              )}
            </AnimatePresence>
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl border border-orange-100 p-6">
              <div className="flex items-center gap-2 mb-2">
                <Shuffle className="w-5 h-5 text-orange-500" />
                <h3 className="font-semibold text-slate-700 text-sm">选择困难症？</h3>
              </div>
              <p className="text-xs text-slate-400 mb-5 leading-relaxed">不知道吃啥？让命运帮你做选择，一键随机抽取校园美食！</p>
              <button onClick={() => setShowRandomModal(true)} className="w-full py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold text-sm shadow-lg shadow-orange-200 hover:from-orange-600 hover:to-orange-700 transition-all active:scale-[0.97] flex items-center justify-center gap-2">
                <Shuffle className="w-4 h-4" />随机抽取一家
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "餐厅", value: mockRestaurants.length },
                { label: "最低价", value: `¥${Math.min(...mockRestaurants.map((r) => r.price))}` },
                { label: "均分", value: (mockRestaurants.reduce((a, b) => a + b.rating, 0) / mockRestaurants.length).toFixed(1) },
              ].map((stat) => (
                <div key={stat.label} className="bg-white rounded-2xl p-4 text-center border border-slate-100">
                  <p className="text-lg font-bold text-slate-700">{stat.value}</p>
                  <p className="text-xs text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40">
        <div className="bg-white/70 backdrop-blur-xl border-t border-slate-200/50 px-6 pb-[env(safe-area-inset-bottom)] pt-2">
          <div className="flex items-center justify-around">
            {([{ key: "home", icon: Home, label: "首页" }, { key: "map", icon: Map, label: "地图" }, { key: "decide", icon: Shuffle, label: "随机" }] as const).map((item) => {
              const isActive = mobileView === item.key;
              return (
                <button key={item.key} onClick={() => { if (item.key === "decide") setShowRandomModal(true); else setMobileView(item.key); }} className={`flex flex-col items-center gap-0.5 py-2 px-4 rounded-xl transition-all ${isActive ? "text-orange-500" : "text-slate-400 hover:text-slate-600"}`}>
                  <item.icon className={`w-5 h-5 ${isActive ? "stroke-[2.5]" : ""}`} />
                  <span className="text-[10px] font-medium">{item.label}</span>
                  {isActive && <motion.div layoutId="nav-indicator" className="w-1 h-1 rounded-full bg-orange-500 mt-0.5" />}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <RandomModal isOpen={showRandomModal} onClose={() => setShowRandomModal(false)} onViewDetail={(r) => setSelectedRestaurant(r)} />

      <AnimatePresence>
        {selectedRestaurant && (
          <DetailModal
            restaurant={selectedRestaurant}
            onClose={() => setSelectedRestaurant(null)}
            comments={getComments(selectedRestaurant.id)}
            onAddComment={handleAddComment}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
