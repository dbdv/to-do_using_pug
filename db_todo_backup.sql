-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 17-06-2022 a las 09:33:12
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `test1`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Admins`
--

CREATE TABLE `Admins` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `Admins`
--

INSERT INTO `Admins` (`id`, `id_user`, `createdAt`, `updatedAt`) VALUES
(1, 13, '2022-06-13', '2022-06-13');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Categories`
--

CREATE TABLE `Categories` (
  `id` int(11) NOT NULL,
  `cat` varchar(25) NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `Categories`
--

INSERT INTO `Categories` (`id`, `cat`, `createdAt`, `updatedAt`) VALUES
(16, 'Estudios', '0000-00-00', '0000-00-00'),
(546, 'Varios', '0000-00-00', '0000-00-00'),
(685, 'Personal', '0000-00-00', '0000-00-00'),
(691, 'Arquitectura', '2022-06-13', '2022-06-13');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Items`
--

CREATE TABLE `Items` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_list` int(11) DEFAULT NULL,
  `title` varchar(50) NOT NULL,
  `descrip` varchar(250) NOT NULL,
  `state` varchar(50) NOT NULL,
  `priority` int(11) NOT NULL,
  `deadline` date DEFAULT NULL,
  `resolutionDate` date DEFAULT NULL,
  `creationDate` date NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `Items`
--

INSERT INTO `Items` (`id`, `id_user`, `id_list`, `title`, `descrip`, `state`, `priority`, `deadline`, `resolutionDate`, `creationDate`, `createdAt`, `updatedAt`) VALUES
(20, 12, NULL, 'crypto item 2', 'siadfjhids', 'Sin resolver', 3, NULL, NULL, '2022-06-09', '2022-06-09', '2022-06-09'),
(21, 12, 4, 'crypto item', 'dasfsa', 'Sin resolver', 3, NULL, NULL, '2022-06-09', '2022-06-09', '2022-06-09'),
(22, 13, NULL, 'un item de test', 'algo', 'Sin resolver', 1, NULL, NULL, '2022-06-11', '2022-06-11', '2022-06-11'),
(23, 13, NULL, 'probando', '123', 'Sin resolver', 3, '2022-06-30', NULL, '2022-06-11', '2022-06-11', '2022-06-11'),
(33, 17, 11, 'algo', 'algo', 'Resolviendo', 3, NULL, NULL, '2022-06-15', '2022-06-15', '2022-06-15'),
(36, 18, NULL, 'ola', 'olasss', 'Resolviendo', 2, NULL, NULL, '2022-06-16', '2022-06-16', '2022-06-16'),
(37, 18, NULL, '.lllll', 'jjjj', 'Resolviendo', 2, NULL, NULL, '2022-06-16', '2022-06-16', '2022-06-16'),
(38, 18, 14, 'test', 'help', 'Resolviendo', 2, '2050-06-09', NULL, '2022-06-16', '2022-06-16', '2022-06-16'),
(39, 18, NULL, 'hhhhhhh', 'liiii', 'Resolviendo', 2, '2036-06-09', NULL, '2022-06-16', '2022-06-16', '2022-06-16'),
(43, 13, 18, 'un item para la lista de test', 'afoiasi', 'Resuelta', 2, NULL, NULL, '2022-06-16', '2022-06-16', '2022-06-17'),
(45, 13, 18, 'un item para borra la lista', 'asgdgsdg', 'Resuelta', 2, NULL, NULL, '2022-06-17', '2022-06-17', '2022-06-17'),
(46, 13, 18, 'otro para probar', 'sdjikglsidg', 'Resuelta', 2, NULL, NULL, '2022-06-17', '2022-06-17', '2022-06-17');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Lists`
--

CREATE TABLE `Lists` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `state` varchar(50) NOT NULL,
  `creationDate` date NOT NULL,
  `resolutionDate` date DEFAULT NULL,
  `id_category` int(11) NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `Lists`
--

INSERT INTO `Lists` (`id`, `id_user`, `title`, `state`, `creationDate`, `resolutionDate`, `id_category`, `createdAt`, `updatedAt`) VALUES
(4, 12, 'una lista para crypto', 'Sin resolver', '2022-06-09', NULL, 685, '2022-06-09', '2022-06-09'),
(11, 17, 'una lista en cuenta github', 'Resuelta', '2022-06-15', NULL, 16, '2022-06-15', '2022-06-15'),
(13, 18, 'olaaaa', 'Resuelta', '2022-06-16', NULL, 16, '2022-06-16', '2022-06-16'),
(14, 18, 'ingles', 'Resuelta', '2022-06-16', NULL, 16, '2022-06-16', '2022-06-16'),
(18, 13, 'una lista para test', 'Resuelta', '2022-06-16', NULL, 685, '2022-06-16', '2022-06-17'),
(25, 13, 'otra masss', 'Sin resolver', '2022-06-17', NULL, 16, '2022-06-17', '2022-06-17'),
(26, 19, 'hdfhdfhdfh', 'Sin resolver', '2022-06-17', NULL, 16, '2022-06-17', '2022-06-17');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Priorities`
--

CREATE TABLE `Priorities` (
  `id` int(11) NOT NULL,
  `descrip` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `Priorities`
--

INSERT INTO `Priorities` (`id`, `descrip`) VALUES
(1, 'Baja'),
(2, 'Media'),
(3, 'Alta');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Users`
--

CREATE TABLE `Users` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `pass` varchar(100) NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `Users`
--

INSERT INTO `Users` (`id`, `name`, `email`, `pass`, `createdAt`, `updatedAt`) VALUES
(12, 'crypto', 'mailcrypto@mail.com', '$2b$10$YZkIURGT3XuK2N88SzlC7.3eHlt0cetYnVjc2fcHDM2UPKVICWVKO', '2022-06-09', '2022-06-09'),
(13, 'test', 'test@test.com', '$2b$10$YZtrjfT0apLWQ9lgpqelhe1SeSuZVSALABf5PL1QFwlF6G..qGE3e', '2022-06-11', '2022-06-11'),
(15, 'nombre', 'unmail@mail.com', '$2b$10$Nh0r/hnc23OuQHaygX/VL.tn/EgCSbF5aQ/oRK/2Thu74OfEq0fUG', '2022-06-14', '2022-06-14'),
(16, 'nombre', 'ununmail@mail.com', '$2b$10$RzTnSndgNa/uOoUdJXB98eQLdr2cnZ1ZG3HIxsLqYluytv3Fqw5Vm', '2022-06-14', '2022-06-14'),
(17, 'Daniel Bustillos', '69542340', '', '2022-06-14', '2022-06-14'),
(18, 'ailen', 'ailen@gmail.com', '$2b$10$PubmK0TMpTgymBH9gjTEnO15.xdUw4i1sWH75BXZ1p/3cNy6Y93k6', '2022-06-16', '2022-06-16'),
(19, 'tester2', 'tester2@mail.com', '$2b$10$fadQmTpQCKcb32QjQohISe6mZuXgdHexHisACXGGxRodYWxNSx5Xy', '2022-06-17', '2022-06-17');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `Admins`
--
ALTER TABLE `Admins`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`);

--
-- Indices de la tabla `Categories`
--
ALTER TABLE `Categories`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `Items`
--
ALTER TABLE `Items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `priority` (`priority`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_list` (`id_list`);

--
-- Indices de la tabla `Lists`
--
ALTER TABLE `Lists`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category` (`id_category`),
  ADD KEY `id_user` (`id_user`);

--
-- Indices de la tabla `Priorities`
--
ALTER TABLE `Priorities`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `Admins`
--
ALTER TABLE `Admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `Categories`
--
ALTER TABLE `Categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=692;

--
-- AUTO_INCREMENT de la tabla `Items`
--
ALTER TABLE `Items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT de la tabla `Lists`
--
ALTER TABLE `Lists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `Users`
--
ALTER TABLE `Users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `Admins`
--
ALTER TABLE `Admins`
  ADD CONSTRAINT `Admins_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `Users` (`id`);

--
-- Filtros para la tabla `Items`
--
ALTER TABLE `Items`
  ADD CONSTRAINT `Items_ibfk_1` FOREIGN KEY (`priority`) REFERENCES `Priorities` (`id`),
  ADD CONSTRAINT `Items_ibfk_3` FOREIGN KEY (`id_list`) REFERENCES `Lists` (`id`),
  ADD CONSTRAINT `Items_ibfk_4` FOREIGN KEY (`id_user`) REFERENCES `Users` (`id`);

--
-- Filtros para la tabla `Lists`
--
ALTER TABLE `Lists`
  ADD CONSTRAINT `Lists_ibfk_1` FOREIGN KEY (`id_category`) REFERENCES `Categories` (`id`),
  ADD CONSTRAINT `Lists_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `Users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
