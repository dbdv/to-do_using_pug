-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 15-06-2022 a las 06:54:32
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
(1, 1, NULL, 'Item de prueba 1', 'descripcion 1', 'Sin resolver', 2, NULL, NULL, '2022-05-31', '2022-05-31', '2022-06-01'),
(2, 1, NULL, 'Item de prueba  2', 'Descripcion 2', 'Resuelta', 3, '2022-06-16', NULL, '2022-05-31', '2022-05-31', '2022-06-01'),
(9, 1, NULL, 'probandou', 'asdasd', 'Resolviendo', 2, NULL, NULL, '2022-06-07', '2022-06-07', '2022-06-07'),
(17, 2, NULL, 'Primer item de Julio', 'Hostia!', 'Sin resolver', 2, NULL, NULL, '2022-06-08', '2022-06-08', '2022-06-08'),
(18, 2, 3, 'Primer item en la lista de julio!', '468', 'Sin resolver', 3, NULL, NULL, '2022-06-08', '2022-06-08', '2022-06-08'),
(20, 12, NULL, 'crypto item 2', 'siadfjhids', 'Sin resolver', 3, NULL, NULL, '2022-06-09', '2022-06-09', '2022-06-09'),
(21, 12, 4, 'crypto item', 'dasfsa', 'Sin resolver', 3, NULL, NULL, '2022-06-09', '2022-06-09', '2022-06-09'),
(22, 13, NULL, 'un item de test', 'algo', 'Sin resolver', 1, NULL, NULL, '2022-06-11', '2022-06-11', '2022-06-11'),
(23, 13, NULL, 'probando', '123', 'Sin resolver', 3, '2022-06-30', NULL, '2022-06-11', '2022-06-11', '2022-06-11'),
(29, 13, 6, 'algo', 'algo', 'Resuelta', 3, '2023-04-01', NULL, '2022-06-14', '2022-06-14', '2022-06-14'),
(33, 17, 11, 'algo', 'algo', 'Resolviendo', 3, NULL, NULL, '2022-06-15', '2022-06-15', '2022-06-15');

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
(1, 1, 'Lista de prueba 1', 'Sin resolver', '2022-05-31', NULL, 16, '2022-05-31', '2022-05-31'),
(2, 1, 'Lista de prueba 2', 'Sin resolver', '2022-05-31', NULL, 16, '2022-05-31', '2022-05-31'),
(3, 2, 'La primera lista de Julio!!', 'Sin resolver', '2022-06-08', NULL, 546, '2022-06-08', '2022-06-08'),
(4, 12, 'una lista para crypto', 'Sin resolver', '2022-06-09', NULL, 685, '2022-06-09', '2022-06-09'),
(5, 13, 'una lista para test', 'Resuelta', '2022-06-13', NULL, 546, '2022-06-13', '2022-06-14'),
(6, 13, 'otra lista', 'Resuelta', '2022-06-13', NULL, 546, '2022-06-13', '2022-06-13'),
(11, 17, 'una lista en cuenta github', 'Resuelta', '2022-06-15', NULL, 16, '2022-06-15', '2022-06-15');

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
(1, 'Fernanda', 'unmail@mail.com', 'unapass', '0000-00-00', '0000-00-00'),
(2, 'Julio', 'otromail@mail.com', 'otrapass', '0000-00-00', '0000-00-00'),
(3, 'walter', 'otrootromail@mail.com', 'walter', '2022-06-09', '2022-06-09'),
(10, 'susana', 'unmailx@mail.com', 'susana', '2022-06-09', '2022-06-09'),
(11, 'julian', 'otromailx@mail.com', 'julian', '2022-06-09', '2022-06-09'),
(12, 'crypto', 'mailcrypto@mail.com', '$2b$10$YZkIURGT3XuK2N88SzlC7.3eHlt0cetYnVjc2fcHDM2UPKVICWVKO', '2022-06-09', '2022-06-09'),
(13, 'test', 'test@test.com', '$2b$10$YZtrjfT0apLWQ9lgpqelhe1SeSuZVSALABf5PL1QFwlF6G..qGE3e', '2022-06-11', '2022-06-11'),
(15, 'nombre', 'unmail@mail.com', '$2b$10$Nh0r/hnc23OuQHaygX/VL.tn/EgCSbF5aQ/oRK/2Thu74OfEq0fUG', '2022-06-14', '2022-06-14'),
(16, 'nombre', 'ununmail@mail.com', '$2b$10$RzTnSndgNa/uOoUdJXB98eQLdr2cnZ1ZG3HIxsLqYluytv3Fqw5Vm', '2022-06-14', '2022-06-14'),
(17, 'Daniel Bustillos', '69542340', '', '2022-06-14', '2022-06-14');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT de la tabla `Lists`
--
ALTER TABLE `Lists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `Users`
--
ALTER TABLE `Users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

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
