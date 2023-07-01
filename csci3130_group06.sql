-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: db.cs.dal.ca
-- Generation Time: Jun 27, 2023 at 01:35 PM
-- Server version: 10.3.21-MariaDB
-- PHP Version: 7.4.33
USE csci3130_group06;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `csci3130_group06`
--

-- --------------------------------------------------------

--
-- Table structure for table `Board`
--

CREATE TABLE `Board` (
  `board_id` int(11) NOT NULL,
  `board_name` varchar(255) NOT NULL,
  `workspace_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Task`
--

CREATE TABLE `Task` (
  `task_id` int(11) NOT NULL,
  `task_name` varchar(255) NOT NULL,
  `status` varchar(25) NOT NULL,
  `board_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Task_has_user`
--

CREATE TABLE `Task_has_user` (
  `task_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE `User` (
  `user_id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `security_question` varchar(255) DEFAULT NULL,
  `security_answer` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `user_sign_in`
--

CREATE TABLE `user_sign_in` (
  `id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Workspace`
--

CREATE TABLE `Workspace` (
  `workspace_id` int(11) NOT NULL,
  `workspace_name` varchar(255) NOT NULL,
  `workspace_type` varchar(255) not null,
  `workspace_desc` varchar(1024) default ''
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Board`
--
ALTER TABLE `Board`
  ADD PRIMARY KEY (`board_id`),
  ADD KEY `workspace_id` (`workspace_id`);

--
-- Indexes for table `Task`
--
ALTER TABLE `Task`
  ADD PRIMARY KEY (`task_id`),
  ADD KEY `board_id` (`board_id`);

--
-- Indexes for table `Task_has_user`
--
ALTER TABLE `Task_has_user`
  ADD PRIMARY KEY (`task_id`,`user_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_sign_in`
--
ALTER TABLE `user_sign_in`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Workspace`
--
ALTER TABLE `Workspace`
  ADD PRIMARY KEY (`workspace_id`);
--   ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Task`
--
ALTER TABLE `Task`
  MODIFY `task_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_sign_in`
--
ALTER TABLE `user_sign_in`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Workspace`
--
ALTER TABLE `Workspace`
  MODIFY `workspace_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Board`
--
ALTER TABLE `Board`
  ADD CONSTRAINT `Board_ibfk_1` FOREIGN KEY (`workspace_id`) REFERENCES `Workspace` (`workspace_id`);

--
-- Constraints for table `Task`
--
ALTER TABLE `Task`
  ADD CONSTRAINT `Task_ibfk_1` FOREIGN KEY (`board_id`) REFERENCES `Board` (`board_id`);

--
-- Constraints for table `Task_has_user`
--
ALTER TABLE `Task_has_user`
  ADD CONSTRAINT `Task_has_user_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `Task` (`task_id`),
  ADD CONSTRAINT `Task_has_user_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`);

--
-- Constraints for table `Workspace`
--
-- ALTER TABLE `Workspace`
--   ADD CONSTRAINT `Workspace_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`);
-- COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
