package com.company.controller;

import com.company.dto.AdvertisementDTO;
import com.company.service.AdvertisementService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping({"/advertisements", "/"})
public class AdvertisementController {
    private final AdvertisementService advertisementService;

    public AdvertisementController(AdvertisementService advertisementService) {
        this.advertisementService = advertisementService;
    }

    @GetMapping("/all")
    public List<AdvertisementDTO> all() {
        return advertisementService.read();
    }

    @GetMapping("/{id}")
    public AdvertisementDTO findById(@PathVariable("id") Long id) {
        return advertisementService.getById(id);
    }

    @PostMapping("/create")
    public ResponseEntity<AdvertisementDTO> add(@RequestBody AdvertisementDTO advertisementDTO) {
        return ResponseEntity.ok().body(advertisementService.create(advertisementDTO));
    }

    @PutMapping("/update")
    public ResponseEntity<String> update(@RequestBody AdvertisementDTO advertisementDTO) {
        advertisementService.update(advertisementDTO);
        return ResponseEntity.ok().body("Advertisement was updated successfully");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        advertisementService.delete(id);
        return ResponseEntity.ok().body("Category was deleted successfully");
    }
}
