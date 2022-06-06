-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 04-06-2022 a las 18:42:59
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_todo_prueba`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Categories`
--

CREATE TABLE `Categories` (
  `id` int(11) NOT NULL,
  `cat` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `Categories`
--

INSERT INTO `Categories` (`id`, `cat`) VALUES
(16, 'Estudios'),
(546, 'Varios'),
(685, 'Personal');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `InLists`
--

CREATE TABLE `InLists` (
  `id_item` int(11) NOT NULL,
  `id_list` int(11) NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `InLists`
--

INSERT INTO `InLists` (`id_item`, `id_list`, `createdAt`, `updatedAt`) VALUES
(1, 1, '2022-05-31', '2022-05-31'),
(1, 2, '2022-05-31', '2022-05-31'),
(2, 1, '2022-05-31', '2022-05-31');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Items`
--

CREATE TABLE `Items` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
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

INSERT INTO `Items` (`id`, `id_user`, `title`, `descrip`, `state`, `priority`, `deadline`, `resolutionDate`, `creationDate`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'Item de prueba 1', 'descripcion 1', 'Sin resolver', 2, NULL, NULL, '2022-05-31', '2022-05-31', '2022-06-01'),
(2, 1, 'Item de prueba  2', 'Descripcion 2', 'Resuelta', 3, '2022-06-16', NULL, '2022-05-31', '2022-05-31', '2022-06-01'),
(3, 1, 'sdfsd', 'sgsdgsd', 'Resolviendo', 2, NULL, NULL, '2022-06-01', '2022-06-01', '2022-06-01');

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
(2, 1, 'Lista de prueba 2', 'Sin resolver', '2022-05-31', NULL, 16, '2022-05-31', '2022-05-31');

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
  `pass` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `Users`
--

INSERT INTO `Users` (`id`, `name`, `email`, `pass`) VALUES
(1, 'Fernanda', 'unmail@mail.com', 'unapass'),
(2, 'Julio', 'otromail@mail.com', 'otrapass');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `Categories`
--
ALTER TABLE `Categories`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `InLists`
--
ALTER TABLE `InLists`
  ADD KEY `id_item` (`id_item`),
  ADD KEY `id_list` (`id_list`);

--
-- Indices de la tabla `Items`
--
ALTER TABLE `Items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `priority` (`priority`),
  ADD KEY `id_user` (`id_user`);

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
-- AUTO_INCREMENT de la tabla `Categories`
--
ALTER TABLE `Categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=686;

--
-- AUTO_INCREMENT de la tabla `Items`
--
ALTER TABLE `Items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `Lists`
--
ALTER TABLE `Lists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `InLists`
--
ALTER TABLE `InLists`
  ADD CONSTRAINT `InLists_ibfk_1` FOREIGN KEY (`id_item`) REFERENCES `Items` (`id`),
  ADD CONSTRAINT `InLists_ibfk_2` FOREIGN KEY (`id_list`) REFERENCES `Lists` (`id`);

--
-- Filtros para la tabla `Items`
--
ALTER TABLE `Items`
  ADD CONSTRAINT `Items_ibfk_1` FOREIGN KEY (`priority`) REFERENCES `Priorities` (`id`),
  ADD CONSTRAINT `Items_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `Users` (`id`);

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
